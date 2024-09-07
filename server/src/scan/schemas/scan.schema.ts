import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { QRCode } from '../../qrCode/schemas/qrCode.schema'

@Schema({ timestamps: true })
export class Scan {
    @Prop({ required: true })
    nation: string

    @Prop({ required: true })
    city: string

    @Prop({ required: true })
    device: string

    @Prop({ type: Types.ObjectId, ref: (() => QRCode).name })
    qrCode: QRCode
}

export const ScanSchema = SchemaFactory.createForClass(Scan)
