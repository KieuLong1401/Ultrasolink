import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from '../../user/schemas/user.schema'

export enum type {
    LINK,
    PDF,
    EMAIL,
    PHONE_NUMBER,
}

@Schema({ timestamps: true, id: false })
export class ShortLink extends Document {
    @Prop({ required: true, unique: true })
    shortenLink: string

    @Prop({ required: true })
    url: string

    @Prop({ default: 'Default' })
    folder: string

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
