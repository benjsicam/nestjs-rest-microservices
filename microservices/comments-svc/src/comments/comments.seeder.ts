import { PinoLogger } from 'nestjs-pino'
import { Inject, Injectable } from '@nestjs/common'
import { lorem, random } from 'faker'
import { times } from 'lodash'

import { CommentsService } from './comments.interface'
import { Comment } from './comment.entity'

@Injectable()
export class CommentsSeeder {
  private readonly ORGS: Array<string> = ['62a1c874-1f3f-4e24-a553-05289eea6332', 'f891fa17-d33f-49cb-baea-ced2539fa574']

  constructor(@Inject('CommentsService') private readonly service: CommentsService, private readonly logger: PinoLogger) {
    logger.setContext(CommentsSeeder.name)
  }

  async seedDatabase(): Promise<number> {
    const recordCount: number = await this.service.count()

    if (recordCount > 0) {
      this.logger.info('CommentsSeeder#seedDatabase', 'Aborting...')

      return recordCount
    }

    const numOfRecords: number = random.number({ min: 10, max: 30 })

    this.logger.info('CommentsSeeder#seedDatabase.numOfRecords', numOfRecords)

    times(numOfRecords, async () => {
      const comment: Comment = await this.service.create({
        organization: random.arrayElement(this.ORGS),
        comment: lorem.sentence()
      })

      this.logger.info('CommentsSeeder#seedDatabase.newRecord', comment)
    })

    return numOfRecords
  }
}
