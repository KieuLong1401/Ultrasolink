import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { User } from '../user/schemas/user.schema'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            userNameField: 'email',
        })
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(email, password)
        if (user) {
            return user
        }
    }
}
