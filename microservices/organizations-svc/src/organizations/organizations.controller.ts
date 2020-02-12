import { PinoLogger } from 'nestjs-pino'
import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { isEmpty } from 'lodash'

import { Query, Count, Name } from '../commons/interfaces/commons.interface'
import { OrganizationsService, OrganizationsQueryResult } from './organizations.interface'

import { Organization } from './organization.entity'

@Controller()
export class OrganizationsController {
  constructor(@Inject('OrganizationsService') private readonly organizationsService: OrganizationsService, private readonly logger: PinoLogger) {
    logger.setContext(OrganizationsController.name)
  }

  @GrpcMethod('OrganizationsService', 'findAll')
  async findAll(query: Query): Promise<OrganizationsQueryResult> {
    this.logger.info('OrganizationsController#findAll.call', query)

    const result: Array<Organization> = await this.organizationsService.findAll({
      attributes: !isEmpty(query.attributes) ? query.attributes : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.order) ? JSON.parse(query.order) : undefined,
      offset: query.offset ? query.offset : 0,
      limit: query.limit ? query.limit : 25
    })

    this.logger.info('OrganizationsController#findAll.result', result)

    return { data: result }
  }

  @GrpcMethod('OrganizationsService', 'findByName')
  async findByName(data: Name): Promise<Organization> {
    this.logger.info('OrganizationsController#findByName.call', data)

    const result: Organization = await this.organizationsService.findOne({
      where: { name: data.name }
    })

    this.logger.info('OrganizationsController#findByName.result', result)

    return result
  }

  @GrpcMethod('OrganizationsService', 'count')
  async count(query: Query): Promise<Count> {
    this.logger.info('OrganizationsController#count.call', query)

    const count: number = await this.organizationsService.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined
    })

    this.logger.info('OrganizationsController#count.result', count)

    return { count }
  }
}
