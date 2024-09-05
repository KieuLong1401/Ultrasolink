import { Test, TestingModule } from '@nestjs/testing'
import { ShortLinkController } from './shortLink.controller'
import { ShortLinkService } from './shortLink.service'
import { CreateShortLinkDto } from './dto/create-shortLink.dto'
import { UpdateShortLinkDto } from './dto/update-shortLink.dto'

const mockShortLink = {
    id: 'AFPOIWNE',
    url: 'https://a.b/c',
    createdAt: '2024-08-28T01:24:10.010Z',
    updatedAt: '2024-08-28T01:24:10.010Z',
    __v: 0,
}

const mockShortLinkService = {
    create: jest.fn().mockResolvedValue(mockShortLink),
    findOne: jest.fn().mockResolvedValue(mockShortLink),
    update: jest.fn().mockResolvedValue(mockShortLink),
    remove: jest.fn().mockResolvedValue(mockShortLink),
}

describe('ShortLinkController', () => {
    let controller: ShortLinkController
    let service: ShortLinkService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShortLinkController],
            providers: [
                ShortLinkService,
                {
                    provide: ShortLinkService,
                    useValue: mockShortLinkService,
                },
            ],
        }).compile()

        controller = module.get<ShortLinkController>(ShortLinkController)
        service = module.get<ShortLinkService>(ShortLinkService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should create a new short link', async () => {
        const newShortLink = await controller.create(
            mockShortLink as CreateShortLinkDto
        )
        expect(newShortLink).toEqual(mockShortLink)
        expect(service.create).toHaveBeenCalledWith(mockShortLink)
    })
    it('should find a single short link', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const shortLink = await controller.findOne(id)
        expect(shortLink).toEqual(mockShortLink)
        expect(service.findOne).toHaveBeenCalledWith(id)
    })
    it('should delete a short link', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const deletedShortLink = await controller.remove(id)
        expect(deletedShortLink).toEqual(mockShortLink)
        expect(service.remove).toHaveBeenCalledWith(id)
    })
    it('should update a short link', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const updatedShortLink = await controller.update(
            id,
            mockShortLink as UpdateShortLinkDto
        )
        expect(updatedShortLink).toEqual(mockShortLink)
        expect(service.update).toHaveBeenCalledWith(id, mockShortLink)
    })
})
