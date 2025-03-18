import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../user/schemas/user.schema'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email)
        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new UnauthorizedException('password is incorrect')
        }

        const { password: _, ...result } = user
        return result
    }

    async login(user: any): Promise<{ access_token: string }> {
        const payload = { email: user.email, id: user.id }
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async signup(user: { email: string; password: string }) {
        const existingUser = await this.userService.findByEmail(user.email)
        if (existingUser) {
            throw new UnauthorizedException('User already exists')
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)
        const newUser = { ...user, password: hashedPassword } as User
        await this.userService.create(newUser)
        return this.login(newUser)
    }
}
