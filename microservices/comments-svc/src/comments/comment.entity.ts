import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({
  modelName: 'comment',
  tableName: 'comments',
  underscored: true,
  paranoid: true,
  timestamps: true,
  version: true
})
export class Comment extends Model<Comment> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    comment: 'The identifier for the comment record'
  })
  id: string

  @Column({
    type: DataType.UUID,
    comment: 'Ref: Organization. The organization the comment is associated with'
  })
  organization: string

  @Column({
    type: DataType.TEXT,
    comment: 'The comment text'
  })
  comment: string
}
