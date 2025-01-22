import { Injectable } from '@nestjs/common'
import { CreateShortLinkDto } from './dto/create-shortLink.dto'
import { UpdateShortLinkDto } from './dto/update-shortLink.dto'
import { InjectModel } from '@nestjs/mongoose'
import { ShortLink } from './schemas/shortLink.schema'
import mongoose, { Model, ObjectId } from 'mongoose'
import { nanoid } from 'nanoid'

@Injectable()
export class ShortLinkService {
    constructor(
        @InjectModel(ShortLink.name) private ShortLinkModel: Model<ShortLink>
    ) {}

    async create(createShortLinkDto: CreateShortLinkDto): Promise<ShortLink> {
        let shortenLink: string

        shortenLink = nanoid(5)

        return this.ShortLinkModel.create({
            ...createShortLinkDto,
            shortenLink,
        })
    }

    async findOne(id: mongoose.Types.ObjectId): Promise<ShortLink> {
        return await this.ShortLinkModel.findById(id).exec()
    }

    async update(
        id: mongoose.Types.ObjectId,
        updateShortLinkDto: UpdateShortLinkDto
    ) {
        return await this.ShortLinkModel.findByIdAndUpdate(
            id,
            updateShortLinkDto
        ).exec()
    }

    async remove(id: mongoose.Types.ObjectId) {
        return await this.ShortLinkModel.findByIdAndDelete(id).exec()
    }
}
