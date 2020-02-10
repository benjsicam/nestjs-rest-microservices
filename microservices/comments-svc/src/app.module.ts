import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import { CommentsModule } from './comments/comments.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development'
      }
    }),
    DatabaseModule,
    CommentsModule
  ]
})
export class AppModule {}
