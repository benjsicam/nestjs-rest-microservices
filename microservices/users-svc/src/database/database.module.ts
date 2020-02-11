import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

import { databaseProviders } from './database.providers'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development'
      }
    })
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule {}
