import { Injectable } from '@nestjs/common'
import { CreateQrcodeDto } from './dto/create-qrcode.dto'
import { UpdateQrcodeDto } from './dto/update-qrcode.dto'
import { QRCode } from './schemas/QRCode.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class QrcodeService {
    constructor(@InjectModel(QRCode.name) private QRCodeModel: Model<QRCode>) {}

    async create(createQrcodeDto: CreateQrcodeDto): Promise<QRCode> {
        return this.QRCodeModel.create(createQrcodeDto)
    }

    async findOne(id: string): Promise<QRCode> {
        return this.QRCodeModel.findById(id).exec()
    }

    async update(
        id: string,
        updateQrcodeDto: UpdateQrcodeDto
    ): Promise<QRCode> {
        return this.QRCodeModel.findByIdAndUpdate(id, updateQrcodeDto).exec()
    }

    async remove(id: string): Promise<QRCode> {
        return this.QRCodeModel.findByIdAndDelete(id).exec()
    }
}
