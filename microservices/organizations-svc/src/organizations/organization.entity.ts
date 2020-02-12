import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({
  modelName: 'organization',
  tableName: 'organizations',
  underscored: true,
  timestamps: true,
  version: true
})
export class Organization extends Model<Organization> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'The identifier for the organization record'
  })
  id: string

  @Column({
    type: DataType.STRING,
    unique: true,
    comment: 'The name of the organization'
  })
  name: string
}
