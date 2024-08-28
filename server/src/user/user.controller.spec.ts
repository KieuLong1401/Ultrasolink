import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { User } from '../schemas/user.schema'

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
const mockUserService = {
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
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

    it('should return an array of users', async () => {
        const users = await controller.findAll()
        expect(users).toEqual([mockUser])
    })

    it('should return a single user', async () => {
        const user = await controller.findOne('someId')
        expect(user).toEqual(mockUser)
    })

    it('should create a new user', async () => {
        const newUser = await controller.create(mockUser as User)
        expect(newUser).toEqual(mockUser)
    })

    it('should delete a user', async () => {
        const deletedUser = await controller.remove('someId')
        expect(deletedUser).toEqual(mockUser)
    })
})
