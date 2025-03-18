interface MongodbConfigProps {
    connectionString: string
}

export interface ConfigProps {
    port: number
    mongodb: {
        database: MongodbConfigProps
    }
    jwt: {
        secret: string
        access_token_validity_duration_in_sec: string
    }
}
