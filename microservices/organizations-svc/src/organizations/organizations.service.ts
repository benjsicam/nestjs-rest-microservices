import { PinoLogger } from 'nestjs-pino'
import { Inject, Injectable } from '@nestjs/common'
import { FindOptions } from 'sequelize/types'

import { OrganizationsService } from './organizations.interface'

import { Organization } from './organization.entity'
import { OrganizationDto } from './organization.dto'

@Injectable()
export class OrganizationsServiceImpl implements OrganizationsService {
  constructor(@Inject('OrganizationsRepository') private readonly repo: typeof Organization, private readonly logger: PinoLogger) {
    logger.setContext(OrganizationsServiceImpl.name)
  }

  async findAll(query?: FindOptions): Promise<Array<Organization>> {
    this.logger.info('OrganizationsService#findAll.call', query)

    const result: Array<Organization> = await this.repo.findAll(query)

    this.logger.info('OrganizationsService#findAll.result', result)

    return result
  }

  async findOne(query?: FindOptions): Promise<Organization> {
    this.logger.info('OrganizationsService#findOne.call', query)

    const result: Organization = await this.repo.findOne(query)

    this.logger.info('OrganizationsService#findOne.result', result)

    return result
  }

  async count(query?: FindOptions): Promise<number> {
    this.logger.info('OrganizationsService#count.call', query)

    const result: number = await this.repo.count(query)

    this.logger.info('OrganizationsService#count.result', result)

    return result
  }

  async create(organizationDto: OrganizationDto): Promise<Organization> {
    this.logger.info('OrganizationsService#create.call', organizationDto)

    const organization: Organization = await this.repo.create(organizationDto)

    this.logger.info('OrganizationsService#create.result', organization)

    return organization
  }
}
