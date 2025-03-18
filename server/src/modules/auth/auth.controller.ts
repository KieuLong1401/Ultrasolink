import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { Public } from '../../decorators/public.decorator'

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() body: { email: string; password: string }) {
        return this.authService.signup(body)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }
}
