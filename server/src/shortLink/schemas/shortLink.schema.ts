import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ timestamps: true })
export class ShortLink {
    @Prop({ required: true, unique: true })
    id: string

    @Prop({ required: true })
    url: string
}

export const ShortLinkSchema = SchemaFactory.createForClass(ShortLink)
