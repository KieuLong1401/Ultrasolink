import { PartialType } from '@nestjs/mapped-types'
import { CreateShortLinkDto } from './create-shortLink.dto'

export class UpdateShortLinkDto extends PartialType(CreateShortLinkDto) {}
