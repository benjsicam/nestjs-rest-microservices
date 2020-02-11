import { FindOptions } from 'sequelize/types'

import { Comment } from './comment.entity'
import { CommentDto } from './comment.dto'

export interface CommentsQueryResult {
  data: Array<Comment>
}

export interface CommentsService {
  findAll(query?: FindOptions): Promise<Array<Comment>>
  count(query?: FindOptions): Promise<number>
  create(comment: CommentDto): Promise<Comment>
  destroy(query?: FindOptions): Promise<number>
}
