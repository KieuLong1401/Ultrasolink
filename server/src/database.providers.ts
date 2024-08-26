import { ConfigService } from '@nestjs/config'
import * as mongoose from 'mongoose'

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(
                'mongodb+srv://kieulong1401:oruUzwpk17oQn79X@long.lqny9.mongodb.net/?retryWrites=true&w=majority&appName=long'
            ),
    },
]
