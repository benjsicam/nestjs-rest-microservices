import { FindOptions } from 'sequelize/types'

import { Organization } from './organization.entity'
import { OrganizationDto } from './organization.dto'

export interface OrganizationsQueryResult {
  data: Array<Organization>
}

export interface OrganizationsService {
  findAll(query?: FindOptions): Promise<Array<Organization>>
  findOne(query?: FindOptions): Promise<Organization>
  count(query?: FindOptions): Promise<number>
  create(organization: OrganizationDto): Promise<Organization>
}
