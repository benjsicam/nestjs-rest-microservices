import { Observable } from 'rxjs'

import { Count, Query } from '../commons/interfaces/commons.interface'

export interface User {
  id: string
  organization: string
  loginId: string
  avatar: string
  followers: number
  following: number
  createdAt: string
  updatedAt: string
}

export interface UsersQueryResult {
  data: Array<User>
}

export interface UsersService {
  findAll(query?: Query): Observable<UsersQueryResult>
  count(query?: Query): Observable<Count>
}
