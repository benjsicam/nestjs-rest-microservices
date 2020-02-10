import { Count } from '../../commons/interfaces/request-response.interface'
import { Query } from '../../commons/interfaces/data.interface'

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
