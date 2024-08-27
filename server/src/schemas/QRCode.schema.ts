import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'
import { User } from './user.schema'

export type QRCodeDocument = HydratedDocument<QRCode>

enum type {
    LINK,
    PDF,
    EMAIL,
    PHONE_NUMBER
}  

@Schema({timestamps: true})
export class QRCode {
    @Prop({
        unique: true,
        required: true,
    })
    id: number

    @Prop({
        unique: true,
        required: true
    })
    shortLink: string

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    user: User | null

    @Prop({default: null})
    folder: string | null

    @Prop({default: false})
    isTracked: boolean

    @Prop({required: true})
    name: string

    @Prop({required: true})
    type: type
}

export const QRCodeSchema = SchemaFactory.createForClass(QRCode)