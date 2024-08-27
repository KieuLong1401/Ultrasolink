import { ConfigProps } from 'src/interfaces/config.interface'

export const config = (): ConfigProps => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    mongodb: {
        database: {
            connectionString:
                process.env.MONGODB_CONNECTION_STRING ||
                'mongodb://localhost:27017',
        },
    },
})
