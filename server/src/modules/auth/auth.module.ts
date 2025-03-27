import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from '../user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { FolderModule } from '../folder/folder.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        FolderModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret'),
                signOptions: {
                    expiresIn: parseInt(
                        configService.get<string>(
                            'jwt.access_token_validity_duration_in_sec'
                        )
                    ),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
