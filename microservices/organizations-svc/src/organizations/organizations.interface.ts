import { FindOptions } from 'sequelize/types'

import { Organization } from './organization.entity'

export interface OrganizationsQueryResult {
  data: Array<Organization>
}

export interface OrganizationsService {
  findAll(query?: FindOptions): Promise<Array<Organization>>
  findOne(query?: FindOptions): Promise<Organization>
  count(query?: FindOptions): Promise<number>
}
