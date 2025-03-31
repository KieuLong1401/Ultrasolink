import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import mongoose from 'mongoose'
import { plan, User } from './schemas/user.schema'

const mockUser = {
    _id: new mongoose.Types.ObjectId('66ce7c395b09800d5de0ab1e'),
    email: 'test@gmail.com',
    password: 'test',
    plan: plan.FREE,
    QrCode: [],
    createdAt: new Date('2024-08-28T01:24:10.010Z'),
    updatedAt: new Date('2024-08-28T01:24:10.010Z'),
    __v: 0,
} as unknown as User

const mockUserService = {
    create: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    remove: jest.fn().mockResolvedValue(mockUser),
}

describe('UserController', () => {
    let controller: UserController
    let service: UserService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile()

        controller = module.get<UserController>(UserController)
        service = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should create a new user', async () => {
        const newUser = await controller.create(mockUser as CreateUserDto)
        expect(newUser).toEqual(mockUser)
        expect(service.create).toHaveBeenCalledWith(mockUser)
    })

    it('should delete a user', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const deletedUser = await controller.remove(id)
        expect(deletedUser).toEqual(mockUser)
        expect(service.remove).toHaveBeenCalledWith(
            new mongoose.Types.ObjectId(id)
        )
    })
    it('should update a user', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const updatedUser = await controller.update(
            id,
            mockUser as UpdateUserDto
        )
        expect(updatedUser).toEqual(mockUser)
        expect(service.update).toHaveBeenCalledWith(
            new mongoose.Types.ObjectId(id),
            mockUser
        )
    })
})
