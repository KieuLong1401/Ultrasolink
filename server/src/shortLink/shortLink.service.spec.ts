import { Test, TestingModule } from '@nestjs/testing'
import { ShortLinkService } from './shortLink.service'
import { ShortLink } from './schemas/shortLink.schema'
import { Model } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'
import { CreateShortLinkDto } from './dto/create-shortLink.dto'
import { UpdateShortLinkDto } from './dto/update-shortLink.dto'

const mockShortLink = {
    id: 'AFPOIWNE',
    url: 'https://a.b/c',
    createdAt: '2024-08-28T01:24:10.010Z',
    updatedAt: '2024-08-28T01:24:10.010Z',
    __v: 0,
}

const mockShortLinkModel = {
    create: jest.fn().mockReturnValue(mockShortLink),
    findById: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockShortLink) }),
    findByIdAndDelete: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockShortLink) }),
    findByIdAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockShortLink) }),
}

describe('ShortLinkService', () => {
    let service: ShortLinkService
    let model: Model<ShortLink>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ShortLinkService,
                {
                    provide: getModelToken(ShortLink.name),
                    useValue: mockShortLinkModel,
                },
            ],
        }).compile()

        service = module.get<ShortLinkService>(ShortLinkService)
        model = module.get<Model<ShortLink>>(getModelToken(ShortLink.name))
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
    it('should create a new short link', async () => {
        const createShortLinkDto: CreateShortLinkDto = {
            id: 'AFPOIWNE',
            url: 'https://a.b/c',
        }
        const newShortLink = await service.create(createShortLinkDto)
        expect(newShortLink).toEqual(mockShortLink)
        expect(model.create).toHaveBeenCalledWith(createShortLinkDto)
    })
    it('should return a single short link', async () => {
        const id = 'AFPOIWNE'
        const shortLInk = await service.findOne(id)
        expect(shortLInk).toEqual(mockShortLink)
        expect(model.findById).toHaveBeenCalledWith(id)
    })
    it('should delete a short link', async () => {
        const id = 'AFPOIWNE'
        const removedShortLink = await service.remove(id)
        expect(removedShortLink).toEqual(mockShortLink)
        expect(model.findByIdAndDelete).toHaveBeenCalledWith(id)
    })
    it('should update an short link', async () => {
        const id = 'AFPOIWNE'
        const updateShortLinkDto: UpdateShortLinkDto = {
            id: 'AFPOIWNE',
            url: 'https://a.b/c',
        }
        const updatedShortLink = await service.update(id, updateShortLinkDto)
        expect(updatedShortLink).toEqual(mockShortLink)
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            id,
            updateShortLinkDto
        )
    })
})
