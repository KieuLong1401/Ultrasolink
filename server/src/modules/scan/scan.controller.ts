import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common'
import { ScanService } from './scan.service'
import { CreateScanDto } from './dto/create-scan.dto'

@Controller('scan')
export class ScanController {
    constructor(private readonly scanService: ScanService) {}

    @Post()
    create(@Body() createScanDto: CreateScanDto) {
        try {
            return this.scanService.create(createScanDto)
        } catch (error) {
            throw new BadRequestException('fail to create scan')
        }
    }

    @Get('qrCode/:id')
    findByQrCode(@Param('id') id: string) {
        try {
            const scans = this.scanService.findByQrCode(id)
            if (!scans)
                throw new NotFoundException(
                    `scans of qr code with id ${id} not found`
                )
            return scans
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to find scans of qr code with id ${id}`
            )
        }
    }
}
