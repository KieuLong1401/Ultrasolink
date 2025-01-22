import { Injectable } from '@nestjs/common'

@Injectable()
export class IpService {
    getClientIp(req: any): string {
        const forwarded = req.headers['x-forwarded-for']
        const ip = forwarded
            ? forwarded.split(',')[0]
            : req.socket.remoteAddress
        return ip || '127.0.0.1'
    }
}
