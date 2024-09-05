import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { QRCode } from '../../qrCode/schemas/qrCode.schema'

export type UserDocument = HydratedDocument<User>

export enum plan {
    FREE,
    PRO,
}

@Schema({ timestamps: true })
export class User {
    @Prop({
        unique: true,
    })
    email: string

    @Prop()
    password: string

    @Prop({
        default: plan.FREE,
    })
    plan: plan

    @Prop([{ type: Types.ObjectId, ref: (() => QRCode).name }])
    QRCode: QRCode[]
}

export const UserSchema = SchemaFactory.createForClass(User)
