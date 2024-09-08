import { PartialType } from '@nestjs/mapped-types'
import { CreateQrCodeDto } from './create-qrCode.dto'

export class UpdateQrCodeDto extends PartialType(CreateQrCodeDto) {}
