import { FindOptions } from 'sequelize/types'

import { Comment } from '../comment.entity'
import { CommentDto } from '../dtos/comment.dto'

export interface Count {
  count: number
}

export interface CommentsService {
  findAll(query?: FindOptions): Promise<Comment[]>
  create(comment: CommentDto): Promise<Comment>
  destroy(query?: FindOptions): Promise<number>
}
