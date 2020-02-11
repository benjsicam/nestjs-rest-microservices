import { Observable } from 'rxjs'

import { Count, Query, Name } from '../commons/interfaces/commons.interface'

export interface Organization {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface OrganizationsQueryResult {
  data: Array<Organization>
}

export interface OrganizationsService {
  findAll(query?: Query): Observable<OrganizationsQueryResult>
  findByName(name: Name): Observable<Organization>
  count(query?: Query): Observable<Count>
}
