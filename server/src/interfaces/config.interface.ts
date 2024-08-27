interface MongodbConfigProps {
    connectionString: string
}

export interface ConfigProps {
    port: number
    mongodb: {
        database: MongodbConfigProps
    }
}
