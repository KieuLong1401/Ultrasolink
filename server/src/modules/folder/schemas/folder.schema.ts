import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { User } from '../../user/schemas/user.schema'

@Schema({ timestamps: true, id: false })
export class Folder extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ type: Types.ObjectId, ref: (() => User).name, required: true })
    user: User
}

export const FolderSchema = SchemaFactory.createForClass(Folder)
