import { FindOptions } from 'sequelize/types'

import { User } from './user.entity'

export interface UserServiceQueryResult {
  data: Array<User>
}

export interface UsersService {
  findAll(query?: FindOptions): Promise<Array<User>>
  count(query?: FindOptions): Promise<number>
}
