import { Module } from '@nestjs/common'
import { ShortLinkService } from './shortLink.service'
import { ShortLinkController } from './shortLink.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { ShortLink, ShortLinkSchema } from './schemas/shortLink.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ShortLink.name, schema: ShortLinkSchema },
        ]),
    ],
    controllers: [ShortLinkController],
    providers: [ShortLinkService],
})
export class ShortLinkModule {}
