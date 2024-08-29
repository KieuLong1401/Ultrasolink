import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { User } from '../../user/schemas/user.schema'

export type QRCodeDocument = HydratedDocument<QRCode>

export enum type {
    LINK,
    PDF,
    EMAIL,
    PHONE_NUMBER,
}

@Schema({ timestamps: true })
export class QRCode {
    @Prop({
        unique: true,
        required: true,
    })
    shortLink: string

    @Prop({ type: Types.ObjectId, ref: (() => User).name })
    user: Types.ObjectId

    @Prop({ default: null })
    folder: string | null

    @Prop({ default: false })
    isTracked: boolean

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    type: type
}

export const QRCodeSchema = SchemaFactory.createForClass(QRCode)
