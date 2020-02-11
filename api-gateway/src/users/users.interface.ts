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

export interface UsersService {
  findAll(query?: Query): Promise<User[]>
  count(query?: Query): Promise<Count>
}
