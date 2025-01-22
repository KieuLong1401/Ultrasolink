import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
    Req,
} from '@nestjs/common'
import { Request } from 'express'
import { ScanService } from './scan.service'
import { CreateScanDto } from './dto/create-scan.dto'
import mongoose from 'mongoose'
import { GeoLocationService } from '../../services/geolocation.service'
import { IpService } from '../../services/ip.service'

@Controller('scan')
export class ScanController {
    constructor(
        private readonly scanService: ScanService,
        private readonly geoLocationService: GeoLocationService,
        private readonly ipService: IpService
    ) {}

    @Post()
    async create(@Body() createScanDto: CreateScanDto, @Req() req: Request) {
        try {
            const clientIp = this.ipService.getClientIp(req)
            const { country, city } =
                await this.geoLocationService.getGeoLocation(clientIp)

            return this.scanService.create({
                ...createScanDto,
                country,
                city,
            })
        } catch (error) {
            throw new BadRequestException('fail to create scan')
        }
    }

    @Get('qrCode/:id')
    findByQrCode(@Param('id') id: string) {
        try {
            const scans = this.scanService.findByQrCode(
                new mongoose.Types.ObjectId(id)
            )
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
