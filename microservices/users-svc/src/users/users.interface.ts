import { FindOptions } from 'sequelize/types'

import { User } from './user.entity'

export interface UsersService {
  findAll(query?: FindOptions): Promise<User[]>
  count(query?: FindOptions): Promise<number>
}
