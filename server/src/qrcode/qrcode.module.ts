import { Module } from '@nestjs/common'
import { QrcodeService } from './qrcode.service'
import { QrcodeController } from './qrcode.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { QRCode, QRCodeSchema } from './schemas/QRCode.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: QRCode.name, schema: QRCodeSchema },
        ]),
    ],
    controllers: [QrcodeController],
    providers: [QrcodeService],
})
export class QrcodeModule {}
