import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { config } from './config/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './modules/user/user.module'
import { QrCodeModule } from './modules/qrCode/qrCode.module'
import { ShortLinkModule } from './modules/shortLink/shortLink.module'
import { ScanModule } from './modules/scan/scan.module'

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
        QrCodeModule,
        ShortLinkModule,
        ScanModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
