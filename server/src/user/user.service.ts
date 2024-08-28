import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.UserModel.create(createUserDto)
    }

    async findAll(): Promise<User[]> {
        return this.UserModel.find().exec()
    }

    async findOne(id: string) {
        return this.UserModel.findById(id).exec()
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return this.UserModel.findByIdAndUpdate(id, updateUserDto).exec()
    }

    async remove(id: string) {
        return this.UserModel.findByIdAndDelete(id).exec()
    }
}
