import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaType, SchemaTypes } from 'mongoose'
import { QRCode } from './QRCode.schema'

export type UserDocument = HydratedDocument<User>

enum plan {
    FREE,
    PRO
}  

@Schema({timestamps: true})
export class User {
    @Prop({
        unique: true,
        required: true,
    })
    id: number

    @Prop({
        unique: true
    })
    email: string

    @Prop()
    password: string

    @Prop({
        default: plan.FREE
    })
    plan: plan

    @Prop([{ type: SchemaTypes.ObjectId, ref: QRCode.name }])
    QRCode: QRCode[]
}

export const UserSchema = SchemaFactory.createForClass(User)
