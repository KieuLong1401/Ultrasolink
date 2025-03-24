import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'
import { User } from '../user/schemas/user.schema'
import { JwtService } from '@nestjs/jwt'
import { SignupRequestDto } from './dto/signupRequest.dto'
import { AccessToken } from 'src/types/AccessToken'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email)
        if (!user) throw new BadRequestException('User not found')

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new BadRequestException('Invalid password')

        return user
    }

    async login(user: any): Promise<{ access_token: string }> {
        const payload = { email: user.email } //
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async signup(user: SignupRequestDto): Promise<AccessToken> {
        const existingUser = await this.userService.findByEmail(user.email)
        if (existingUser) throw new UnauthorizedException('User already exists')

        const hashedPassword = await bcrypt.hash(user.password, 10)
        const newUser = { ...user, password: hashedPassword } as User

        await this.userService.create(newUser)
        return this.login(newUser)
    }
}
