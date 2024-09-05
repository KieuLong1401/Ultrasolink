import { Injectable } from '@nestjs/common'
import { CreateScanDto } from './dto/create-scan.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Scan } from './schemas/scan.schema'
import { Model } from 'mongoose'

@Injectable()
export class ScanService {
    constructor(@InjectModel(Scan.name) private ScanModel: Model<Scan>) {}

    create(createScanDto: CreateScanDto): Promise<Scan> {
        return this.ScanModel.create(createScanDto)
    }

    findByQrCode(qrCodeId: string): Promise<Scan[]> {
        return this.ScanModel.find({ qrCode: qrCodeId }).exec()
    }

    remove(id: string): Promise<Scan> {
        return this.ScanModel.findByIdAndDelete(id).exec()
    }
}
