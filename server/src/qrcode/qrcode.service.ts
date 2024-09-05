import { Injectable } from '@nestjs/common'
import { CreateQrcodeDto } from './dto/create-qrCode.dto'
import { UpdateQrcodeDto } from './dto/update-qrCode.dto'
import { QRCode } from './schemas/qrCode.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class QrcodeService {
    constructor(@InjectModel(QRCode.name) private QRCodeModel: Model<QRCode>) {}

    create(createQrcodeDto: CreateQrcodeDto): Promise<QRCode> {
        return this.QRCodeModel.create(createQrcodeDto)
    }

    findOne(id: string): Promise<QRCode> {
        return this.QRCodeModel.findById(id).exec()
    }

    findByUserId(id: string): Promise<QRCode[]> {
        return this.QRCodeModel.find({ user: id }).exec()
    }

    update(id: string, updateQrcodeDto: UpdateQrcodeDto): Promise<QRCode> {
        return this.QRCodeModel.findByIdAndUpdate(id, updateQrcodeDto).exec()
    }

    remove(id: string): Promise<QRCode> {
        return this.QRCodeModel.findByIdAndDelete(id).exec()
    }
}
