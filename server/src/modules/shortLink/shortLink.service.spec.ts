import { Test, TestingModule } from '@nestjs/testing'
import { ShortLinkService } from './shortLink.service'
import { ShortLink } from './schemas/shortLink.schema'
import mongoose, { Model } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'
import { CreateShortLinkDto } from './dto/create-shortLink.dto'
import { UpdateShortLinkDto } from './dto/update-shortLink.dto'

const mockShortLink = {
    url: 'https://a.b/c',
    folder: 'Default',
    name: 'name',
    type: 'LINK',
    user: '66ce7c395b09800d5de0ab1e',
    shortenLink: new mongoose.Types.ObjectId('678b7ff2aed1bbe1313420c9'),
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
    findOne: jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(mockShortLink),
    }),
    find: jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue([mockShortLink]),
    }),
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
            url: 'https://a.b/c',
            folder: 'Default',
            name: 'name',
            type: 'LINK',
            user: '66ce7c395b09800d5de0ab1e',
        }
        const newShortLink = await service.create(createShortLinkDto)
        expect(newShortLink).toEqual(mockShortLink)
    })
    it('should return a single short link', async () => {
        const id = new mongoose.Types.ObjectId('678b7ff2aed1bbe1313420c9')
        const shortLink = await service.findOne(id)
        expect(shortLink).toEqual(mockShortLink)
        expect(model.findById).toHaveBeenCalledWith(id)
    })
    it('should delete a short link', async () => {
        const id = new mongoose.Types.ObjectId('678b7ff2aed1bbe1313420c9')
        const removedShortLink = await service.remove(id)
        expect(removedShortLink).toEqual(mockShortLink)
        expect(model.findByIdAndDelete).toHaveBeenCalledWith(id)
    })
    it('should update an short link', async () => {
        const id = new mongoose.Types.ObjectId('678b7ff2aed1bbe1313420c9')
        const updateShortLinkDto: UpdateShortLinkDto = {
            url: 'https://a.b/c',
            folder: 'Default',
            name: 'name',
            type: 'LINK',
            user: '66ce7c395b09800d5de0ab1e',
        }
        const updatedShortLink = await service.update(id, updateShortLinkDto)
        expect(updatedShortLink).toEqual(mockShortLink)
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            id,
            updateShortLinkDto
        )
    })
})
