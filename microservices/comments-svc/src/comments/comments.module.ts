import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

import { Comment } from './comment.entity'
import { CommentsController } from './comments.controller'
import { CommentsServiceImpl } from './comments.service'
import { CommentsSeeder } from './comments.seeder'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development'
      }
    })
  ],
  controllers: [CommentsController],
  providers: [CommentsSeeder, { provide: 'CommentsService', useClass: CommentsServiceImpl }, { provide: 'CommentsRepository', useValue: Comment }]
})
export class CommentsModule {}
