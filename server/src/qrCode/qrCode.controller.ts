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
import { QrcodeService } from './qrCode.service'
import { CreateQrcodeDto } from './dto/create-qrCode.dto'
import { UpdateQrcodeDto } from './dto/update-qrCode.dto'

@Controller('qrcode')
export class QrcodeController {
    constructor(private readonly qrcodeService: QrcodeService) {}

    @Post()
    create(@Body() createQrcodeDto: CreateQrcodeDto) {
        try {
            return this.qrcodeService.create(createQrcodeDto)
        } catch (error) {
            throw new BadRequestException('fail to create qr code')
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            const qrCode = this.qrcodeService.findOne(id)
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
            const qrCodes = this.qrcodeService.findByUserId(id)
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
    update(@Param('id') id: string, @Body() updateQrcodeDto: UpdateQrcodeDto) {
        try {
            const updatedQrCode = this.qrcodeService.update(id, updateQrcodeDto)
            if (!updateQrcodeDto)
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
            const deletedQrCode = this.qrcodeService.remove(id)
            if (!deletedQrCode) throw new NotFoundException('qr code not found')
            return deletedQrCode
        } catch (error) {
            throw new InternalServerErrorException(
                `fail to delete the qr code with id: ${id}`
            )
        }
    }
}
