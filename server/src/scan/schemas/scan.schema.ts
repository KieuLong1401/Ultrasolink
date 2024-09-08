import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { QrCode } from '../../qrCode/schemas/qrCode.schema'

@Schema({ timestamps: true })
export class Scan {
    @Prop({ required: true })
    nation: string

    @Prop({ required: true })
    city: string

    @Prop({ required: true })
    device: string

    @Prop({ type: Types.ObjectId, ref: (() => QrCode).name })
    qrCode: QrCode
}

export const ScanSchema = SchemaFactory.createForClass(Scan)
