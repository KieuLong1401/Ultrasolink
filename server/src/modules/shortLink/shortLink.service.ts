import { Injectable } from '@nestjs/common'
import { CreateShortLinkDto } from './dto/create-shortLink.dto'
import { UpdateShortLinkDto } from './dto/update-shortLink.dto'
import { InjectModel } from '@nestjs/mongoose'
import { ShortLink } from './schemas/shortLink.schema'
import { Model } from 'mongoose'

@Injectable()
export class ShortLinkService {
    constructor(
        @InjectModel(ShortLink.name) private ShortLinkModel: Model<ShortLink>
    ) {}

    create(createShortLinkDto: CreateShortLinkDto): Promise<ShortLink> {
        return this.ShortLinkModel.create(createShortLinkDto)
    }

    findOne(id: string) {
        return this.ShortLinkModel.findById(id).exec()
    }

    update(id: string, updateShortLinkDto: UpdateShortLinkDto) {
        return this.ShortLinkModel.findByIdAndUpdate(
            id,
            updateShortLinkDto
        ).exec()
    }

    remove(id: string) {
        return this.ShortLinkModel.findByIdAndDelete(id).exec()
    }
}
