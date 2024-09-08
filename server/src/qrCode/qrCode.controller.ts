import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common'
import { QrCodeService } from './qrCode.service'
import { CreateQrCodeDto } from './dto/create-qrCode.dto'
import { UpdateQrCodeDto } from './dto/update-qrCode.dto'

@Controller('qr-code')
export class QrCodeController {
    constructor(private readonly qrCodeService: QrCodeService) {}

    @Post()
    create(@Body() createQrCodeDto: CreateQrCodeDto) {
        try {
            return this.qrCodeService.create(createQrCodeDto)
        } catch (error) {
            throw new BadRequestException('fail to create qr code')
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            const qrCode = this.qrCodeService.findOne(id)
            if (!qrCode) throw new NotFoundException('qr code not found')
            return qrCode
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to find the qr code with id: ${id}`
            )
        }
    }

    @Get('user/:id')
    findByUserId(@Param('id') id: string) {
        try {
            const qrCodes = this.qrCodeService.findByUserId(id)
            if (!qrCodes)
                throw new NotFoundException(
                    `qr codes of user with id ${id} not found`
                )
            return qrCodes
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to find qr code of user with id ${id}`
            )
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateQrCodeDto: UpdateQrCodeDto) {
        try {
            const updatedQrCode = this.qrCodeService.update(id, updateQrCodeDto)
            if (!updateQrCodeDto)
                throw new NotFoundException('qr code not found')
            return updatedQrCode
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to update the qr code with id: ${id}`
            )
        }
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            const deletedQrCode = this.qrCodeService.remove(id)
            if (!deletedQrCode) throw new NotFoundException('qr code not found')
            return deletedQrCode
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to delete the qr code with id: ${id}`
            )
        }
    }
}
