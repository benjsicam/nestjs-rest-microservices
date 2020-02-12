import { join } from 'path'

import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { Logger } from 'nestjs-pino'

import { AppModule } from './app.module'
import { UsersSeeder } from './users/users.seeder'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: `${process.env.URL}:${process.env.PORT}`,
      package: 'users',
      protoPath: join(__dirname, './_proto/users.proto'),
      loader: {
        enums: String,
        objects: true,
        arrays: true
      }
    }
  })

  app.useLogger(app.get(Logger))

  const seeder: UsersSeeder = app.get(UsersSeeder)

  await seeder.seedDatabase()

  return app.listenAsync()
}

bootstrap()
