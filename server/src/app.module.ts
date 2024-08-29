import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { config } from './config/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module'
import { QrcodeModule } from './qrcode/qrcode.module';

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
        QrcodeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
