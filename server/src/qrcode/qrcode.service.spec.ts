import { Test, TestingModule } from '@nestjs/testing'
import { QrcodeService } from './qrCode.service'
import { QRCode, type } from './schemas/qrCode.schema'
import { Model } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'
import { CreateQrcodeDto } from './dto/create-qrCode.dto'
import { UpdateQrcodeDto } from './dto/update-qrCode.dto'

const mockQrCode = {
    _id: '66ce7c395b09800d5de0ab1e',
    shortLink: 'https://a.b/c',
    user: '66ce7c395b09800d5de0ab1a',
    folder: null,
    isTracked: false,
    name: 'QRCode 1',
    type: type.LINK,
    createdAt: '2024-08-28T01:24:10.010Z',
    updatedAt: '2024-08-28T01:24:10.010Z',
    __v: 0,
}

const mockQrCodeModel = {
    findById: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockQrCode) }),
    find: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue([mockQrCode]) }),
    create: jest.fn().mockReturnValue(mockQrCode),
    findByIdAndDelete: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockQrCode) }),
    findByIdAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockQrCode) }),
}

describe('QrcodeService', () => {
    let service: QrcodeService
    let model: Model<QRCode>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QrcodeService,
                {
                    provide: getModelToken(QRCode.name),
                    useValue: mockQrCodeModel,
                },
            ],
        }).compile()

        service = module.get<QrcodeService>(QrcodeService)
        model = module.get<Model<QRCode>>(getModelToken(QRCode.name))
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should return a single qrCode', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const qrCode = await service.findOne(id)
        expect(qrCode).toEqual(mockQrCode)
        expect(model.findById).toHaveBeenCalledWith(id)
    })

    it('should return qr codes of an user', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const qrCodes = await service.findByUserId(id)
        expect(qrCodes).toEqual([mockQrCode])
        expect(model.find).toHaveBeenCalledWith({ user: id })
    })

    it('should create a new qrCode', async () => {
        const createQrCodeDto: CreateQrcodeDto = {
            shortLink: 'https://a.b/c',
            user: '66ce7c395b09800d5de0ab1a',
            folder: null,
            isTracked: false,
            name: 'QRCode 1',
            type: type.LINK,
        }
        const newQrCode = await service.create(createQrCodeDto)
        expect(newQrCode).toEqual(mockQrCode)
        expect(model.create).toHaveBeenCalledWith(createQrCodeDto)
    })

    it('should delete a qrCode', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const removedQrCode = await service.remove(id)
        expect(removedQrCode).toEqual(mockQrCode)
        expect(model.findByIdAndDelete).toHaveBeenCalledWith(id)
    })
    it('should update an qrCode', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const updateQrCodeDto: UpdateQrcodeDto = {
            shortLink: 'https://a.b/c',
            user: '66ce7c395b09800d5de0ab1a',
            folder: null,
            isTracked: false,
            name: 'QRCode 1',
            type: type.LINK,
        }
        const updatedQrcode = await service.update(id, updateQrCodeDto)
        expect(updatedQrcode).toEqual(mockQrCode)
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            id,
            updateQrCodeDto
        )
    })
})
