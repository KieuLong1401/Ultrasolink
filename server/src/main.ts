import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import { AllExceptionsFilter } from './http-exception/http-exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { abortOnError: false })
    app.useGlobalFilters(new AllExceptionsFilter())

    const configService = app.get(ConfigService)
    const port = configService.get<number>('port')

    await app.listen(port)

    Logger.log(`Application is running on port: ${await app.getUrl()}`)
}
bootstrap()
