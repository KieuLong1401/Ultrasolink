import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { User } from '../../user/schemas/user.schema'

export enum type {
    LINK,
    PDF,
    EMAIL,
    PHONE_NUMBER,
}

@Schema({ timestamps: true, id: false })
export class ShortLink {
    @Prop({ required: true, unique: true })
    shortenLink: string

    @Prop({ required: true })
    url: string

    @Prop({ default: null })
    folder: string | null

    @Prop({ default: false })
    isTracked: boolean

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    type: type

    @Prop({ type: Types.ObjectId, ref: (() => User).name })
    user: User
}

export const ShortLinkSchema = SchemaFactory.createForClass(ShortLink)
