import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { plan, User } from '../user/schemas/user.schema'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import { BadRequestException } from '@nestjs/common'
import { SignupRequestDto } from './dto/signupRequest.dto'

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

describe('AuthService', () => {
    let service: AuthService
    let userService: UserService
    let jwtService: JwtService

    const mockUserService = {
        findByEmail: jest.fn(),
        create: jest.fn(),
    }
    const mockJwtService = {
        sign: jest.fn().mockReturnValue('mockedJwtToken'),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile()

        service = module.get<AuthService>(AuthService)
        userService = module.get<UserService>(UserService)
        jwtService = module.get<JwtService>(JwtService)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('validateUser', () => {
        it('should return user if credentials are valid', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser)
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)

            const result = await service.validateUser(
                mockUser.email,
                mockUser.password
            )

            expect(result).toEqual(mockUser)
            expect(userService.findByEmail).toHaveBeenCalledWith(mockUser.email)
        })

        it('should throw BadRequest exception if user is not found', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValue(null)
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)

            await expect(
                service.validateUser(mockUser.email, mockUser.password)
            ).rejects.toThrow(BadRequestException)
        })

        it('should throw BadRequest exception if password is invalid', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser)

            expect(
                service.validateUser(mockUser.email, 'wrongPassword')
            ).rejects.toThrow(BadRequestException)
        })
    })

    describe('login', () => {
        it('should return access token', async () => {
            const user = { email: mockUser.email, _id: mockUser._id }
            const result = await service.login(user)

            expect(result).toEqual({ access_token: 'mockedJwtToken' })
            expect(jwtService.sign).toHaveBeenCalledWith({
                email: mockUser.email,
                id: mockUser._id.toString(),
            })
        })
    })

    describe('signup', () => {
        it('should create a new user and return access token', async () => {
            const signupDto: SignupRequestDto = {
                email: mockUser.email,
                password: mockUser.password,
            }

            jest.spyOn(userService, 'findByEmail').mockResolvedValue(null)
            jest.spyOn(bcrypt, 'hash').mockResolvedValue(mockUser.password)
            jest.spyOn(userService, 'create').mockResolvedValue(mockUser)

            const result = await service.signup(signupDto)

            expect(result).toEqual({ access_token: 'mockedJwtToken' })
            expect(userService.findByEmail).toHaveBeenCalledWith(
                signupDto.email
            )
            expect(userService.create).toHaveBeenCalledWith(signupDto)
        })

        it('should throw Bad Request exception if user already exists', async () => {
            jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser)

            await expect(
                service.signup({
                    email: mockUser.email,
                    password: mockUser.password,
                })
            ).rejects.toThrow(BadRequestException)
        })
    })
})
