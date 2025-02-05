import { Test, TestingModule } from '@nestjs/testing'
import { FolderService } from './folder.service'
import mongoose, { Model } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'
import { Folder } from './schemas/folder.schema'
import { CreateFolderDto } from './dto/create-folder.dto'

const mockFolder = {
    name: 'Default',
    user: '60ce7c395b09800d5de0ab1e',
}

const mockFolderModel = {
    create: jest.fn().mockReturnValue(mockFolder),
    find: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue([mockFolder]) }),
    findByIdAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockFolder) }),
    findByIdAndDelete: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockReturnValue(mockFolder) }),
}

describe('FolderService', () => {
    let service: FolderService
    let model: Model<Folder>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FolderService,
                {
                    provide: getModelToken(Folder.name),
                    useValue: mockFolderModel,
                },
            ],
        }).compile()

        service = module.get<FolderService>(FolderService)
        model = module.get<Model<Folder>>(getModelToken(Folder.name))
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })

    it('should create a new folder', async () => {
        const createFolderDto: CreateFolderDto = {
            name: 'Default',
            user: '60ce7c395b09800d5de0ab1e',
        }
        const newFolder = await service.create(createFolderDto)
        expect(newFolder).toEqual(mockFolder)
        expect(model.create).toHaveBeenCalledWith(createFolderDto)
    })

    it('should return folders of an user', async () => {
        const id = new mongoose.Types.ObjectId('66ce7c395b09800d5de0ab1e')
        const folders = await service.findByUser(id)
        expect(folders).toEqual([mockFolder])
        expect(model.find).toHaveBeenCalledWith({ user: id })
    })

    it('should update a folder', async () => {
        const id = new mongoose.Types.ObjectId('66ce7c395b09800d5de0ab1e')
        const updateFolderDto: CreateFolderDto = {
            name: 'Default',
            user: '60ce7c395b09800d5de0ab1e',
        }
        const folders = await service.update(id, updateFolderDto)
        expect(folders).toEqual(mockFolder)
        expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
            id,
            updateFolderDto,
            {
                new: true,
            }
        )
    })

    it('should delete a folder', async () => {
        const id = new mongoose.Types.ObjectId('66ce7c395b09800d5de0ab1e')
        const folders = await service.remove(id)
        expect(folders).toEqual(mockFolder)
        expect(model.findByIdAndDelete).toHaveBeenCalledWith(id)
    })
})
