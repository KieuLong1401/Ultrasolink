import { Module } from '@nestjs/common'
import { ScanService } from './scan.service'
import { ScanController } from './scan.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Scan, ScanSchema } from './schemas/scan.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Scan.name, schema: ScanSchema }]),
    ],
    controllers: [ScanController],
    providers: [ScanService],
})
export class ScanModule {}
