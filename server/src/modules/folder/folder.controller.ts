import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
    Patch,
    Delete,
} from '@nestjs/common'
import { FolderService } from './folder.service'
import { CreateFolderDto } from './dto/create-folder.dto'
import { UpdateFolderDto } from './dto/update-folder.dto'
import mongoose from 'mongoose'

@Controller('folder')
export class FolderController {
    constructor(private readonly folderService: FolderService) {}

    @Post()
    create(@Body() createFolderDto: CreateFolderDto) {
        try {
            return this.folderService.create(createFolderDto)
        } catch (error) {
            throw new BadRequestException('fail to create folder')
        }
    }

    @Get('user/:id')
    findByUser(@Param('id') id: string) {
        try {
            const folders = this.folderService.findByUser(
                new mongoose.Types.ObjectId(id)
            )
            if (!folders)
                throw new NotFoundException(
                    `folders of user with id ${id} not found`
                )
            return folders
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to find folders of qr code with id ${id}`
            )
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFolderDto: UpdateFolderDto) {
        try {
            const updatedFolder = this.folderService.update(
                new mongoose.Types.ObjectId(id),
                updateFolderDto
            )
            if (!updatedFolder) throw new NotFoundException('folder not found')
            return updatedFolder
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to update folder with id: ${id}`
            )
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            const deletedFolder = this.folderService.remove(
                new mongoose.Types.ObjectId(id)
            )
            if (!deletedFolder) throw new NotFoundException('folder not found')
            return deletedFolder
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to delete folder with id: ${id}`
            )
        }
    }
}
