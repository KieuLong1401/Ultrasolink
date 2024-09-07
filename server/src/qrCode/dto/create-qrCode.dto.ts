import { type } from '../schemas/qrCode.schema'

export class CreateQrcodeDto {
    shortLink: string
    user: string
    folder: boolean | string
    isTracked: boolean
    name: string
    type: type
}
