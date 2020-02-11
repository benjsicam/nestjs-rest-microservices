import { Count, Query } from '../commons/interfaces/commons.interface'
import { CommentDto } from './comment.dto'

export interface Comment {
  id: string
  organization: string
  comment: string
  createdAt: string
  updatedAt: string
}

export interface CommentsService {
  findAll(query?: Query): Promise<Comment[]>
  count(query?: Query): Promise<Count[]>
  create(comment: CommentDto): Promise<Comment>
  destroy(query?: Query): Promise<Count>
}
