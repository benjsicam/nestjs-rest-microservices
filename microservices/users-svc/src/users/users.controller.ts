import { PinoLogger } from 'nestjs-pino'
import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { Count, Query } from '../commons/interfaces/commons.interface'
import { UsersService } from './users.interface'

import { User } from './user.entity'

@Controller()
export class UsersController {
  constructor(@Inject('UsersService') private readonly usersService: UsersService, private readonly logger: PinoLogger) {
    logger.setContext(UsersController.name)
  }

  @GrpcMethod('UsersService', 'findAll')
  async findAll(data: Query): Promise<User[]> {
    this.logger.info('UsersController#findAll.call', data)

    const result = await this.usersService.findAll({
      attributes: data.attributes || undefined,
      where: data.where ? JSON.parse(data.where) : undefined,
      order: data.order ? JSON.parse(data.order) : undefined,
      offset: data.offset ? data.offset : 0,
      limit: data.limit ? data.limit : 25
    })

    this.logger.info('UsersController#findAll.result', result)

    return result
  }

  @GrpcMethod('UsersService', 'count')
  async count(data: Query): Promise<Count> {
    this.logger.info('UsersController#count.call', data)

    const count = await this.usersService.count({
      where: data.where ? JSON.parse(data.where) : undefined
    })

    this.logger.info('UsersController#count.result', count)

    return { count }
  }
}
