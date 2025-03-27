import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { config } from './config/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './modules/user/user.module'
import { ShortLinkModule } from './modules/shortLink/shortLink.module'
import { ScanModule } from './modules/scan/scan.module'
import { AuthModule } from './modules/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtGuard } from './guards/jwt.guard'
import { JwtStrategy } from './modules/auth/jwt.strategy'
import { LogMiddleware } from './log.middleware'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>(
                    'mongodb.database.connectionString'
                ),
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 45000,
            }),
            inject: [ConfigService],
        }),
        UserModule,
        ShortLinkModule,
        ScanModule,
        AuthModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtGuard,
        },
        JwtStrategy,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LogMiddleware).forRoutes('*')
    }
}
