import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schema'
import mongoose, { Model } from 'mongoose'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.UserModel.create(createUserDto)
    }

    async update(
        id: mongoose.Types.ObjectId,
        updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.UserModel.findByIdAndUpdate(id, updateUserDto).exec()
    }

    async remove(id: mongoose.Types.ObjectId): Promise<User> {
        return this.UserModel.findByIdAndDelete(id).exec()
    }
}
