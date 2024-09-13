import { Module } from '@nestjs/common'
import { QrCodeService } from './qrCode.service'
import { QrCodeController } from './qrCode.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { QrCode, QrCodeSchema } from './schemas/qrCode.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: QrCode.name, schema: QrCodeSchema },
        ]),
    ],
    controllers: [QrCodeController],
    providers: [QrCodeService],
})
export class QrCodeModule {}
