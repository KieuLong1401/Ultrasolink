import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument, Types } from 'mongoose'
import { User } from '../../user/schemas/user.schema'
import { ShortLink } from '../../shortLink/schemas/shortLink.schema'
import { Scan } from '../../scan/schemas/scan.schema'

export type QRCodeDocument = HydratedDocument<QRCode>

export enum type {
    LINK,
    PDF,
    EMAIL,
    PHONE_NUMBER,
}

@Schema({ timestamps: true })
export class QRCode extends Document {
    @Prop({
        unique: true,
        required: true,
        type: Types.ObjectId,
        ref: (() => ShortLink).name,
    })
    shortLink: ShortLink

    @Prop({ type: Types.ObjectId, ref: (() => User).name })
    user: User

    @Prop({ default: null })
    folder: string | null

    @Prop({ default: false })
    isTracked: boolean

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    type: type

    @Prop([{ type: Types.ObjectId, ref: (() => Scan).name }])
    Scan: Scan[]
}

export const QRCodeSchema = SchemaFactory.createForClass(QRCode)

QRCodeSchema.pre('findOneAndDelete', async function (next) {
    const query = this.getQuery()
    if (query && query._id) {
        await new this.model(Scan.name).deleteMany({ qrCode: query._id })
    }
    next()
})
