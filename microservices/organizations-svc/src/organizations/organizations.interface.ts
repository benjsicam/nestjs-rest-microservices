import { FindOptions } from 'sequelize/types'

import { Organization } from './organization.entity'

export interface OrganizationsService {
  findAll(query?: FindOptions): Promise<Organization[]>
  findOne(query?: FindOptions): Promise<Organization>
  count(query?: FindOptions): Promise<number>
}
