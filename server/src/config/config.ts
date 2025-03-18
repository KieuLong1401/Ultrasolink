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
    jwt: {
        secret: process.env.JWT_SECRET || 'defaultSecret',
        access_token_validity_duration_in_sec:
            process.env.ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC,
    },
})
