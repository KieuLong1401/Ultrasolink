import { Injectable } from '@nestjs/common'
import { CreateFolderDto } from './dto/create-folder.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Folder } from './schemas/folder.schema'
import mongoose, { Model } from 'mongoose'
import { UpdateFolderDto } from './dto/update-folder.dto'

@Injectable()
export class FolderService {
    constructor(@InjectModel(Folder.name) private FolderModel: Model<Folder>) {}

    create(createFolderDto: CreateFolderDto): Promise<Folder> {
        return this.FolderModel.create(createFolderDto)
    }

    findByUser(userId: mongoose.Types.ObjectId): Promise<Folder[]> {
        return this.FolderModel.find({ user: userId }).exec()
    }

    update(
        id: mongoose.Types.ObjectId,
        updateFolderDto: UpdateFolderDto
    ): Promise<Folder> {
        return this.FolderModel.findByIdAndUpdate(id, updateFolderDto, {
            new: true,
        }).exec()
    }

    remove(id: mongoose.Types.ObjectId): Promise<Folder> {
        return this.FolderModel.findByIdAndDelete(id).exec()
    }
}
