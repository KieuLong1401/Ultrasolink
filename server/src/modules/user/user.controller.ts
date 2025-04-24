import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
    Get,
    Req,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import mongoose from 'mongoose'
import { ShortLinkService } from '../shortLink/shortLink.service'
import { AuthenticatedRequest } from '../../interfaces/authenticateRequest.interface'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly shortLinkService: ShortLinkService
    ) {}

    @Get('/folders')
    async getUserFolders(@Req() req: AuthenticatedRequest) {
        const id = req.user.id

        try {
            if (!id) throw new BadRequestException('Invalid user ID')
            const folders = await this.shortLinkService.getFoldersByUserId(id)

            if (!folders) throw new NotFoundException('user not found')

            return folders
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to get user folders with id: ${id}`
            )
        }
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.userService.create(createUserDto)
        } catch (error) {
            throw new BadRequestException('Fail to create user')
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ) {
        try {
            const updatedUser = await this.userService.update(
                new mongoose.Types.ObjectId(id),
                updateUserDto
            )
            if (!updatedUser) throw new NotFoundException('user not found')
            return updatedUser
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to update user with id: ${id}`
            )
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            const deletedUser = await this.userService.remove(
                new mongoose.Types.ObjectId(id)
            )
            if (!deletedUser) throw new NotFoundException('user not found')
            return deletedUser
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to delete user with id: ${id}`
            )
        }
    }
}
