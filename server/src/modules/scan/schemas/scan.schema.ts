import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { ShortLink } from '../../shortLink/schemas/shortLink.schema'

@Schema({ timestamps: true, id: false })
export class Scan {
    @Prop({ required: false })
    country: string

    @Prop({ required: false })
    city: string

    @Prop({ required: false })
    device: string

    @Prop({ type: Types.ObjectId, ref: (() => ShortLink).name })
    ShortLink: ShortLink
}

export const ScanSchema = SchemaFactory.createForClass(Scan)
