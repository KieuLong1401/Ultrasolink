import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { config } from './config/config'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        MongooseModule.forRoot(
            'mongodb+srv://kieulong1401:oruUzwpk17oQn79X@long.lqny9.mongodb.net/?retryWrites=true&w=majority&appName=long'
        ),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
