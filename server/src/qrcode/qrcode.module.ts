import { Module } from '@nestjs/common'
import { QrcodeService } from './qrCode.service'
import { QrcodeController } from './qrCode.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { QRCode, QRCodeSchema } from './schemas/qrCode.schema'

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
