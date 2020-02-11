import { Observable } from 'rxjs'

import { Count, Query } from '../commons/interfaces/commons.interface'
import { CommentDto } from './comment.dto'

export interface Comment {
  id: string
  organization: string
  comment: string
  createdAt: string
  updatedAt: string
}

export interface CommentsQueryResult {
  data: Array<Comment>
}

export interface CommentsService {
  findAll(query?: Query): Observable<CommentsQueryResult>
  count(query?: Query): Observable<Count>
  create(comment: CommentDto): Observable<Comment>
  destroy(query?: Query): Observable<Count>
}
