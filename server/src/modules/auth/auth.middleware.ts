import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(req: any, res: any, next: () => void) {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token not found')
        }

        const token = authHeader.split(' ')[1]

        try {
            const user = this.jwtService.verify(token)
            req.user = user
            next()
        } catch (e) {
            throw new UnauthorizedException('Token not valid')
        }
    }
}
