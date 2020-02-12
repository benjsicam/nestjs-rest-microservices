import { PinoLogger } from 'nestjs-pino'
import { Inject, Injectable } from '@nestjs/common'
import { image, internet, random } from 'faker'
import { times } from 'lodash'

import { UsersService } from './users.interface'
import { User } from './user.entity'

@Injectable()
export class UsersSeeder {
  private readonly ORGS: Array<string> = ['62a1c874-1f3f-4e24-a553-05289eea6332', 'f891fa17-d33f-49cb-baea-ced2539fa574']

  constructor(@Inject('UsersService') private readonly service: UsersService, private readonly logger: PinoLogger) {
    logger.setContext(UsersSeeder.name)
  }

  async seedDatabase(): Promise<number> {
    const recordCount: number = await this.service.count()

    if (recordCount > 0) {
      this.logger.info('UsersSeeder#seedDatabase', 'Aborting...')

      return recordCount
    }

    const numOfRecords: number = random.number({ min: 10, max: 30 })

    this.logger.info('UsersSeeder#seedDatabase.numOfRecords', numOfRecords)

    times(numOfRecords, async () => {
      const user: User = await this.service.create({
        organization: random.arrayElement(this.ORGS),
        loginId: internet.userName(),
        avatar: image.avatar(),
        followers: random.number({ min: 1, max: 500 }),
        following: random.number({ min: 1, max: 500 })
      })

      this.logger.info('UsersSeeder#seedDatabase.newRecord', user)
    })

    return numOfRecords
  }
}
