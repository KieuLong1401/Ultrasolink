import { Test, TestingModule } from '@nestjs/testing'
import { FolderController } from './folder.controller'
import { FolderService } from './folder.service'
import { CreateFolderDto } from './dto/create-folder.dto'
import mongoose from 'mongoose'

const mockFolder: CreateFolderDto = {
    name: 'default',
    user: '60ce7c395b09800d5de0ab1e',
}

const mockFolderService = {
    create: jest.fn().mockResolvedValue(mockFolder),
    findByUser: jest.fn().mockResolvedValue([mockFolder]),
    update: jest.fn().mockResolvedValue(mockFolder),
    remove: jest.fn().mockResolvedValue(mockFolder),
}

describe('FolderController', () => {
    let controller: FolderController
    let service: FolderService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FolderController],
            providers: [
                FolderService,
                {
                    provide: FolderService,
                    useValue: mockFolderService,
                },
            ],
        }).compile()

        controller = module.get<FolderController>(FolderController)
        service = module.get<FolderService>(FolderService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    it('should create a new folder', async () => {
        const newFolder = await controller.create(mockFolder)
        expect(newFolder).toEqual(mockFolder)
        expect(service.create).toHaveBeenCalledWith(mockFolder)
    })
    it('should return folders of an user', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const folders = await controller.findByUser(id)
        expect(folders).toEqual([mockFolder])
        expect(service.findByUser).toHaveBeenCalledWith(
            new mongoose.Types.ObjectId(id)
        )
    })

    it('should update a folder', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const updatedFolder = await controller.update(id, mockFolder)
        expect(updatedFolder).toEqual(mockFolder)
        expect(service.update).toHaveBeenCalledWith(
            new mongoose.Types.ObjectId(id),
            mockFolder
        )
    })

    it('should remove a folder', async () => {
        const id = '66ce7c395b09800d5de0ab1e'
        const deletedFolder = await controller.remove(id)
        expect(deletedFolder).toEqual(mockFolder)
        expect(service.remove).toHaveBeenCalledWith(
            new mongoose.Types.ObjectId(id)
        )
    })
})
