import { Test, TestingModule } from '@nestjs/testing'
import { ScanController } from './scan.controller'
import { ScanService } from './scan.service'
import { CreateScanDto } from './dto/create-scan.dto'
import { Request } from 'express'
import { GeoLocationService } from '../../services/geolocation.service'
import { IpService } from '../../services/ip.service'
import mongoose, { mongo } from 'mongoose'

const mockScan: CreateScanDto = {
    country: 'anywhere',
    city: 'here',
    device: 'phone',
    shortLink: 'f;ajwoeifsadf',
}

const mockScanService = {
    create: jest.fn().mockResolvedValue(mockScan),
    findByQrCode: jest.fn().mockResolvedValue([mockScan]),
    findOne: jest.fn().mockResolvedValue(mockScan),
}
const mockGeoLocationService = {
    getGeoLocation: jest.fn().mockResolvedValue({
        country: 'anywhere',
        city: 'here',
    }),
}
const mockIpService = {
    getClientIp: jest.fn().mockReturnValue('211.60.196.169'),
}

describe('ScanController', () => {
    let controller: ScanController
    let service: ScanService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ScanController],
            providers: [
                ScanService,
                {
                    provide: ScanService,
                    useValue: mockScanService,
                },
                {
                    provide: GeoLocationService,
                    useValue: mockGeoLocationService,
                },
                {
                    provide: IpService,
                    useValue: mockIpService,
                },
            ],
        }).compile()

        controller = module.get<ScanController>(ScanController)
        service = module.get<ScanService>(ScanService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should create a new scan', async () => {
        const newScan = await controller.create(mockScan, {} as Request)
        expect(newScan).toEqual(mockScan)
        expect(service.create).toHaveBeenCalledWith(mockScan)
    })
    it('should return scans of a qr code', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const scans = await controller.findByQrCode(id)
        expect(scans).toEqual([mockScan])
        expect(service.findByQrCode).toHaveBeenCalledWith(
            new mongoose.Types.ObjectId(id)
        )
    })
})
