import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { ScanService } from './scan.service'
import { CreateScanDto } from './dto/create-scan.dto'
import { UpdateScanDto } from './dto/update-scan.dto'

@Controller('scan')
export class ScanController {
    constructor(private readonly scanService: ScanService) {}

    @Post()
    create(@Body() createScanDto: CreateScanDto) {
        return this.scanService.create(createScanDto)
    }

    @Get()
    findAll() {
        return this.scanService.findAll()
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.scanService.remove(id)
    }
}
