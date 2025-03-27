import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument, Types } from 'mongoose'

export type UserDocument = HydratedDocument<User>

export enum plan {
    FREE,
    PRO,
}

@Schema({ timestamps: true, id: false })
export class User extends Document {
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
}

export const UserSchema = SchemaFactory.createForClass(User)
