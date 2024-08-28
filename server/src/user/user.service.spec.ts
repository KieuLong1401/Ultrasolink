import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { User } from '../schemas/user.schema'
import { getModelToken } from '@nestjs/mongoose'
import { Model } from 'mongoose'

const mockUser = {
    _id: '66ce7c395b09800d5de0ab1e',
    email: 'test@gmail.com',
    password: 'test',
    plan: 0,
    QRCode: [],
    createdAt: '2024-08-28T01:24:10.010Z',
    updatedAt: '2024-08-28T01:24:10.010Z',
    __v: 0,
}

const mockUserModel = {
    find: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue([mockUser]) }),
    findById: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockUser) }),
    create: jest.fn().mockReturnValue(mockUser),
    findByIdAndDelete: jest
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

    it('should return an array of users', async () => {
        const users = await service.findAll()
        expect(users).toEqual([mockUser])
    })

    it('should return a single user', async () => {
        const user = await service.findOne('someId')
        expect(user).toEqual(mockUser)
    })

    it('should create a new user', async () => {
        const newUser = await service.create(mockUser as User)
        expect(newUser).toEqual(mockUser)
    })

    it('should delete a user', async () => {
        const deletedUser = await service.remove('someId')
        expect(deletedUser).toEqual(mockUser)
    })
})
