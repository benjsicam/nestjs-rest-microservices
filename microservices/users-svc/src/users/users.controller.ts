import { PinoLogger } from 'nestjs-pino'
import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { isEmpty } from 'lodash'

import { Count, Query } from '../commons/interfaces/commons.interface'
import { UsersService, UserServiceQueryResult } from './users.interface'

import { User } from './user.entity'

@Controller()
export class UsersController {
  constructor(@Inject('UsersService') private readonly usersService: UsersService, private readonly logger: PinoLogger) {
    logger.setContext(UsersController.name)
  }

  @GrpcMethod('UsersService', 'findAll')
  async findAll(query: Query): Promise<UserServiceQueryResult> {
    this.logger.info('UsersController#findAll.call', query)

    const result: Array<User> = await this.usersService.findAll({
      attributes: !isEmpty(query.attributes) ? query.attributes : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.order) ? JSON.parse(query.order) : undefined,
      offset: query.offset ? query.offset : 0,
      limit: query.limit ? query.limit : 25
    })

    this.logger.info('UsersController#findAll.result', result)

    return { data: result }
  }

  @GrpcMethod('UsersService', 'count')
  async count(query: Query): Promise<Count> {
    this.logger.info('UsersController#count.call', query)

    const count: number = await this.usersService.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined
    })

    this.logger.info('UsersController#count.result', count)

    return { count }
  }
}
