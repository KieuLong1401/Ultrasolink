import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { plan, User } from './schemas/user.schema'
import { getModelToken } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

const mockUser = {
    _id: '66ce7c395b09800d5de0ab1e',
    email: 'test@gmail.com',
    password: 'test',
    plan: plan.FREE,
    QrCode: [],
    createdAt: '2024-08-28T01:24:10.010Z',
    updatedAt: '2024-08-28T01:24:10.010Z',
    __v: 0,
}

const mockUserModel = {
    create: jest.fn().mockReturnValue(mockUser),
    findByIdAndDelete: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockUser) }),
    findByIdAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockUser) }),
}

describe('UserService', () => {
    let service: UserService
    let model: Model<User>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserModel,
                },
            ],
        }).compile()

        service = module.get<UserService>(UserService)
        model = module.get<Model<User>>(getModelToken(User.name))
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should create a new user', async () => {
        const createUserDto: CreateUserDto = {
            email: 'new@gmail.com',
            password: 'new',
        }
        const newUser = await service.create(createUserDto)
        expect(newUser).toEqual(mockUser)
        expect(model.create).toHaveBeenCalledWith(createUserDto)
    })

    it('should delete a user', async () => {
        const id = new mongoose.Types.ObjectId('66ce7c395b09800d5de0ab1e')
        const removedUser = await service.remove(id)
        expect(removedUser).toEqual(mockUser)
        expect(model.findByIdAndDelete).toHaveBeenCalledWith(id)
    })
    it('should update an user', async () => {
        const id = new mongoose.Types.ObjectId('66ce7c395b09800d5de0ab1e')
        const updateUserDto: UpdateUserDto = {
            email: 'update@gmail.com',
            password: 'update',
        }
        const updatedUser = await service.update(id, updateUserDto)
        expect(updatedUser).toEqual(mockUser)
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith(id, updateUserDto)
    })
})
