import { Count } from '../../commons/interfaces/request-response.interface'
import { Query } from '../../commons/interfaces/data.interface'

export interface Organization {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface OrganizationsService {
  findAll(query?: Query): Promise<Organization[]>
  findOne(query: Query): Promise<Organization>
  count(query?: Query): Promise<Count>
}
