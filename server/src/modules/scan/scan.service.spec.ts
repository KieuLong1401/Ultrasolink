import { Test, TestingModule } from '@nestjs/testing'
import { ScanService } from './scan.service'
import mongoose, { Model } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'
import { Scan } from './schemas/scan.schema'
import { CreateScanDto } from './dto/create-scan.dto'

const mockScan = {
    country: 'anywhere',
    city: 'here',
    device: 'phone',
    shortLink: 'f;ajwoeifsadf',
}

const mockScanModel = {
    create: jest.fn().mockReturnValue(mockScan),
    find: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue([mockScan]) }),
    findByIdAndDelete: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockScan) }),
}

describe('ScanService', () => {
    let service: ScanService
    let model: Model<Scan>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ScanService,
                {
                    provide: getModelToken(Scan.name),
                    useValue: mockScanModel,
                },
            ],
        }).compile()

        service = module.get<ScanService>(ScanService)
        model = module.get<Model<Scan>>(getModelToken(Scan.name))
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should create a new scan', async () => {
        const createScanDto: CreateScanDto = {
            country: 'anywhere',
            city: 'here',
            device: 'phone',
            shortLink: 'f;ajwoeifsadf',
        }
        const newScan = await service.create(createScanDto)
        expect(newScan).toEqual(mockScan)
        expect(model.create).toHaveBeenCalledWith(createScanDto)
    })

    it('should return scans of an qr code', async () => {
        const id = new mongoose.Types.ObjectId('66ce7c395b09800d5de0ab1e')
        const scans = await service.findByQrCode(id)
        expect(scans).toEqual([mockScan])
        expect(model.find).toHaveBeenCalledWith({ qrCode: id })
    })
})
