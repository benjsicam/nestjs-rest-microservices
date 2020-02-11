import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({
  modelName: 'user',
  tableName: 'users',
  underscored: true,
  timestamps: true,
  version: true
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'The identifier for the user record'
  })
  id: string

  @Column({
    type: DataType.UUID,
    comment: 'Ref: Organization. The organization the user is associated with'
  })
  organization: string

  @Column({
    type: DataType.STRING,
    comment: 'The login id of the user'
  })
  loginId: string

  @Column({
    type: DataType.STRING,
    comment: 'The avatar url of the user'
  })
  avatar: string

  @Column({
    type: DataType.INTEGER,
    comment: 'The number of followers of the user'
  })
  followers: number

  @Column({
    type: DataType.INTEGER,
    comment: 'The number of people being followed by the user'
  })
  following: number
}
