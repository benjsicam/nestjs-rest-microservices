import { PinoLogger } from 'nestjs-pino'
import { Inject, Injectable } from '@nestjs/common'

import { FindOptions } from 'sequelize/types'
import { Comment } from './comment.entity'
import { CommentDto } from './dtos/comment.dto'

@Injectable()
export class CommentsService {
  constructor(@Inject('CommentsRepository') private readonly repo: typeof Comment, private readonly logger: PinoLogger) {
    logger.setContext(CommentsService.name)
  }

  async findAll(query?: FindOptions): Promise<Comment[]> {
    this.logger.info('CommentService#findAll.call', query)

    const result = await this.repo.findAll(query)

    this.logger.info('CommentService#findAll.result', result)

    return result
  }

  async count(query?: FindOptions): Promise<number> {
    this.logger.info('CommentService#count.call', query)

    const result = await this.repo.count(query)

    this.logger.info('CommentService#count.result', result)

    return result
  }

  async create(commentDto: CommentDto): Promise<Comment> {
    this.logger.info('CommentService#create.call', commentDto)

    const comment = new Comment(commentDto)

    const result = await comment.save()

    this.logger.info('CommentService#create.result', result)

    return result
  }

  async destroy(query?: FindOptions): Promise<number> {
    this.logger.info('CommentService#destroy.call', query)

    const result = await Comment.destroy(query)

    this.logger.info('CommentService#destroy.result', result)

    return result
  }
}
