import { Count, Query, Name } from '../commons/interfaces/commons.interface'

export interface Organization {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface OrganizationsService {
  findAll(query?: Query): Promise<Organization[]>
  findByName(name: Name): Promise<Organization>
  count(query?: Query): Promise<Count>
}
