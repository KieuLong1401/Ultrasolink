import { Injectable } from '@nestjs/common'
import { CreateQrCodeDto } from './dto/create-qrCode.dto'
import { UpdateQrCodeDto } from './dto/update-qrCode.dto'
import { QrCode } from './schemas/qrCode.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class QrCodeService {
    constructor(@InjectModel(QrCode.name) private QrCodeModel: Model<QrCode>) {}

    create(createQrCodeDto: CreateQrCodeDto): Promise<QrCode> {
        return this.QrCodeModel.create(createQrCodeDto)
    }

    findOne(id: string): Promise<QrCode> {
        return this.QrCodeModel.findById(id).exec()
    }

    findByUserId(id: string): Promise<QrCode[]> {
        return this.QrCodeModel.find({ user: id }).exec()
    }

    update(id: string, updateQrCodeDto: UpdateQrCodeDto): Promise<QrCode> {
        return this.QrCodeModel.findByIdAndUpdate(id, updateQrCodeDto).exec()
    }

    remove(id: string): Promise<QrCode> {
        return this.QrCodeModel.findByIdAndDelete(id).exec()
    }
}
