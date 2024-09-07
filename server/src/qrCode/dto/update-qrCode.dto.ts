import { PartialType } from '@nestjs/mapped-types'
import { CreateQrcodeDto } from './create-qrCode.dto'

export class UpdateQrcodeDto extends PartialType(CreateQrcodeDto) {}
