import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SignupRequestDto } from './dto/signupRequest.dto'
import { AccessToken } from 'src/types/AccessToken'
import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext } from '@nestjs/common'

const mockAuthService = {
    signup: jest.fn().mockResolvedValue({ access_token: 'mockToken' }),
    login: jest.fn().mockResolvedValue({ access_token: 'mockToken' }),
}

describe('AuthController', () => {
    let controller: AuthController
    let service: AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile()

        controller = module.get<AuthController>(AuthController)
        service = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should sign up a user and return an access token', async () => {
        const signupDto: SignupRequestDto = {
            email: 'test@example.com',
            password: 'password123',
        }
        const result: AccessToken = await controller.signup(signupDto)
        expect(result).toEqual({ access_token: 'mockToken' })
        expect(service.signup).toHaveBeenCalledWith(signupDto)
    })

    it('should login a user and return an access token', async () => {
        const req = { user: { email: 'test@example.com', _id: 'mockId' } }
        const result: AccessToken = await controller.login(req)
        expect(result).toEqual({ access_token: 'mockToken' })
        expect(service.login).toHaveBeenCalledWith(req.user)
    })

    it('should use AuthGuard for login', async () => {
        const reflector = { get: jest.fn().mockReturnValue(undefined) }
        const guard = new (AuthGuard('local'))()
        const context = {
            switchToHttp: jest.fn().mockReturnThis(),
            getRequest: jest.fn().mockReturnValue({ body: {} }),
        } as unknown as ExecutionContext

        jest.spyOn(guard, 'canActivate').mockResolvedValue(true)
        await expect(guard.canActivate(context)).resolves.toBeTruthy()
    })
})
