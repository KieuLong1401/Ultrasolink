import { type } from '../schemas/QRCode.schema'

export class CreateQrcodeDto {
    shortLink: string
    user: string
    folder: boolean | string
    isTracked: boolean
    name: string
    type: type
}
