import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from '../../decorators/public.decorator'
import { AuthGuard } from '@nestjs/passport'
import { AccessToken } from 'src/types/AccessToken'
import { SignupRequestDto } from './dto/signupRequest.dto'

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() body: SignupRequestDto): Promise<AccessToken> {
        return this.authService.signup(body)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<AccessToken> {
        return this.authService.login(req.user)
    }
}
