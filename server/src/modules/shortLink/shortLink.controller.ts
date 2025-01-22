import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common'
import { ShortLinkService } from './shortLink.service'
import { CreateShortLinkDto } from './dto/create-shortLink.dto'
import { UpdateShortLinkDto } from './dto/update-shortLink.dto'
import mongoose from 'mongoose'

@Controller('short-link')
export class ShortLinkController {
    constructor(private readonly shortLinkService: ShortLinkService) {}

    @Post()
    create(@Body() createShortLinkDto: CreateShortLinkDto) {
        try {
            return this.shortLinkService.create(createShortLinkDto)
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            const shortLink = this.shortLinkService.findOne(
                new mongoose.Types.ObjectId(id)
            )
            if (!shortLink) throw new NotFoundException('short link not found')
            return shortLink
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to find short link with id: ${id}`
            )
        }
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateShortLinkDto: UpdateShortLinkDto
    ) {
        try {
            const updatedShortLink = this.shortLinkService.update(
                new mongoose.Types.ObjectId(id),
                updateShortLinkDto
            )
            if (!updatedShortLink)
                throw new NotFoundException('short link not found')
            return updatedShortLink
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to update short link with id: ${id}`
            )
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            const deletedShortLink = this.shortLinkService.remove(
                new mongoose.Types.ObjectId(id)
            )
            if (!deletedShortLink)
                throw new NotFoundException('short link not found')
            return deletedShortLink
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to delete short link with id: ${id}`
            )
        }
    }
}
