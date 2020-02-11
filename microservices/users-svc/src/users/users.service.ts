import { PinoLogger } from 'nestjs-pino'
import { Inject, Injectable } from '@nestjs/common'
import { FindOptions } from 'sequelize/types'

import { UsersService } from './users.interface'

import { User } from './user.entity'

@Injectable()
export class UsersServiceImpl implements UsersService {
  constructor(@Inject('UsersRepository') private readonly repo: typeof User, private readonly logger: PinoLogger) {
    logger.setContext(UsersServiceImpl.name)
  }

  async findAll(query?: FindOptions): Promise<User[]> {
    this.logger.info('UsersService#findAll.call', query)

    const result = await this.repo.findAll(query)

    this.logger.info('UsersService#findAll.result', result)

    return result
  }

  async count(query?: FindOptions): Promise<number> {
    this.logger.info('UsersService#count.call', query)

    const result = await this.repo.count(query)

    this.logger.info('UsersService#count.result', result)

    return result
  }
}
