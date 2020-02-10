import { NestFactory } from '@nestjs/core'
import { Logger } from 'nestjs-pino'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useLogger(app.get(Logger))

  return app.listen(process.env.PORT)
}

bootstrap()
