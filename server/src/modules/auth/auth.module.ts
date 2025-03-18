import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                signOptions: {
                    expiresIn: parseInt(
                        configService.get<string>(
                            'jwt.access_token_validity_duration_in_sec'
                        )
                    ),
                },
            }),
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
