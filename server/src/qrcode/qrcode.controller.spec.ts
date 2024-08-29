import { Test, TestingModule } from '@nestjs/testing'
import { QrcodeController } from './qrcode.controller'
import { QrcodeService } from './qrcode.service'
import { type } from './schemas/qrcode.schema'
import { CreateQrcodeDto } from './dto/create-qrcode.dto'
import { UpdateQrcodeDto } from './dto/update-qrcode.dto'

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

const mockQrCodeService = {
    findOne: jest.fn().mockResolvedValue(mockQrCode),
    create: jest.fn().mockResolvedValue(mockQrCode),
    update: jest.fn().mockResolvedValue(mockQrCode),
    remove: jest.fn().mockResolvedValue(mockQrCode),
}

describe('QrcodeController', () => {
    let controller: QrcodeController
    let service: QrcodeService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QrcodeController],
            providers: [
                QrcodeService,
                {
                    provide: QrcodeService,
                    useValue: mockQrCodeService,
                },
            ],
        }).compile()

        controller = module.get<QrcodeController>(QrcodeController)
        service = module.get<QrcodeService>(QrcodeService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should return a single qrCode', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const qrCode = await controller.findOne(id)
        expect(qrCode).toEqual(mockQrCode)
        expect(service.findOne).toHaveBeenCalledWith(id)
    })

    it('should create a new qrCode', async () => {
        const newQrCode = await controller.create(mockQrCode as CreateQrcodeDto)
        expect(newQrCode).toEqual(mockQrCode)
        expect(service.create).toHaveBeenCalledWith(mockQrCode)
    })

    it('should delete a qrCode', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const deletedQrCode = await controller.remove(id)
        expect(deletedQrCode).toEqual(mockQrCode)
        expect(service.remove).toHaveBeenCalledWith(id)
    })
    it('should update a qrCode', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const updatedQrCode = await controller.update(
            id,
            mockQrCode as UpdateQrcodeDto
        )
        expect(updatedQrCode).toEqual(mockQrCode)
        expect(service.update).toHaveBeenCalledWith(id, mockQrCode)
    })
})
