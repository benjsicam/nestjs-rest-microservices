import { PinoLogger } from 'nestjs-pino'
import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'

import { Comment } from './comment.entity'
import { CommentDto } from './dtos/comment.dto'

import { Query } from '../commons/interfaces/data.interface'
import { Count, CommentsService } from './interfaces/comments.interface'

@Controller()
export class CommentsController {
  constructor(@Inject('CommentsService') private readonly commentsService: CommentsService, private readonly logger: PinoLogger) {
    logger.setContext(CommentsController.name)
  }

  @GrpcMethod('CommentsService', 'findAll')
  async findAll(data: Query): Promise<Comment[]> {
    this.logger.info('CommentsController#findAll.call', data)

    const result = await this.commentsService.findAll({
      attributes: data.attributes || undefined,
      where: data.where ? JSON.parse(data.where) : undefined,
      order: data.order ? JSON.parse(data.order) : undefined,
      offset: data.offset ? data.offset : 0,
      limit: data.limit ? data.limit : 25
    })

    this.logger.info('CommentsController#findAll.result', result)

    return result
  }

  @GrpcMethod('CommentsService', 'count')
  async count(data: Query): Promise<Count> {
    this.logger.info('CommentsController#count.call', data)

    const count = await this.commentsService.destroy({
      where: data.where ? JSON.parse(data.where) : undefined
    })

    this.logger.info('CommentsController#count.result', count)

    return { count }
  }

  @GrpcMethod('CommentsService', 'create')
  async create(data: CommentDto): Promise<Comment> {
    this.logger.info('CommentsController#create.call', data)

    const result = await this.commentsService.create(data)

    this.logger.info('CommentsController#destroy.result', result)

    return result
  }

  @GrpcMethod('CommentsService', 'destroy')
  async destroy(data: Query): Promise<Count> {
    this.logger.info('CommentsController#destroy.call', data)

    const count = await this.commentsService.destroy({
      attributes: data.attributes || undefined,
      where: data.where ? JSON.parse(data.where) : undefined,
      order: data.order ? JSON.parse(data.order) : undefined,
      offset: data.offset ? data.offset : 0,
      limit: data.limit ? data.limit : 25
    })

    this.logger.info('CommentsController#destroy.result', count)

    return { count }
  }
}
