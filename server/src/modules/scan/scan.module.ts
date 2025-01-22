import { Module } from '@nestjs/common'
import { ScanService } from './scan.service'
import { ScanController } from './scan.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Scan, ScanSchema } from './schemas/scan.schema'
import { GeoLocationService } from 'src/services/geolocation.service'
import { IpService } from 'src/services/ip.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Scan.name, schema: ScanSchema }]),
    ],
    controllers: [ScanController],
    providers: [ScanService, GeoLocationService, IpService],
})
export class ScanModule {}
