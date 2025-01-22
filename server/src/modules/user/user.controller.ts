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
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import mongoose from 'mongoose'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        try {
            return this.userService.create(createUserDto)
        } catch (error) {
            throw new BadRequestException('Fail to create user')
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const updatedUser = this.userService.update(
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
    remove(@Param('id') id: string) {
        try {
            const deletedUser = this.userService.remove(
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
