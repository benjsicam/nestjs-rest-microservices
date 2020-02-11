import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseProvider } from './database.providers'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development'
      }
    })
  ],
  providers: [DatabaseProvider],
  exports: [DatabaseProvider]
})
export class DatabaseModule {}
