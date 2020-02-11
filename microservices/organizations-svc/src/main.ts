import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { Logger } from 'nestjs-pino'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.URL}:${process.env.PORT}`,
      package: 'organizations',
      protoPath: join(__dirname, './_proto/organizations.proto'),
      loader: {
        enums: String,
        objects: true,
        arrays: true
      }
    }
  })

  app.useLogger(app.get(Logger))

  return app.listenAsync()
}

bootstrap()
