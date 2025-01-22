import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { ShortLink } from '../../shortLink/schemas/shortLink.schema'

export type UserDocument = HydratedDocument<User>

export enum plan {
    FREE,
    PRO,
}

@Schema({ timestamps: true, id: false })
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

    @Prop([{ type: Types.ObjectId, ref: (() => ShortLink).name }])
    ShortLink: ShortLink[]
}

export const UserSchema = SchemaFactory.createForClass(User)
