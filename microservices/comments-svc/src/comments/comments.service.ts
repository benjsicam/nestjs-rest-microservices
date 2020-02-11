import { PinoLogger } from 'nestjs-pino'
import { Inject, Injectable } from '@nestjs/common'
import { FindOptions } from 'sequelize/types'

import { CommentsService } from './comments.interface'

import { Comment } from './comment.entity'
import { CommentDto } from './comment.dto'

@Injectable()
export class CommentsServiceImpl implements CommentsService {
  constructor(@Inject('CommentsRepository') private readonly repo: typeof Comment, private readonly logger: PinoLogger) {
    logger.setContext(CommentsServiceImpl.name)
  }

  async findAll(query?: FindOptions): Promise<Array<Comment>> {
    this.logger.info('CommentsService#findAll.call', query)

    const result = await this.repo.findAll(query)

    this.logger.info('CommentsService#findAll.result', result)

    return result
  }

  async count(query?: FindOptions): Promise<number> {
    this.logger.info('CommentsService#count.call', query)

    const result = await this.repo.count(query)

    this.logger.info('CommentsService#count.result', result)

    return result
  }

  async create(commentDto: CommentDto): Promise<Comment> {
    this.logger.info('CommentsService#create.call', commentDto)

    const comment = new Comment(commentDto)

    const result = await comment.save()

    this.logger.info('CommentsService#create.result', result)

    return result
  }

  async destroy(query?: FindOptions): Promise<number> {
    this.logger.info('CommentsService#destroy.call', query)

    const result = await Comment.destroy(query)

    this.logger.info('CommentsService#destroy.result', result)

    return result
  }
}
