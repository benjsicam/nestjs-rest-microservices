import { PinoLogger } from 'nestjs-pino'
import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { isEmpty } from 'lodash'

import { Count, Query } from '../commons/interfaces/commons.interface'
import { CommentsService, CommentsQueryResult } from './comments.interface'

import { Comment } from './comment.entity'
import { CommentDto } from './comment.dto'

@Controller()
export class CommentsController {
  constructor(@Inject('CommentsService') private readonly commentsService: CommentsService, private readonly logger: PinoLogger) {
    logger.setContext(CommentsController.name)
  }

  @GrpcMethod('CommentsService', 'findAll')
  async findAll(query: Query): Promise<CommentsQueryResult> {
    this.logger.info('CommentsController#findAll.call', query)

    const result: Array<Comment> = await this.commentsService.findAll({
      attributes: !isEmpty(query.attributes) ? query.attributes : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
      order: !isEmpty(query.order) ? JSON.parse(query.order) : undefined,
      offset: query.offset ? query.offset : 0,
      limit: query.limit ? query.limit : 25
    })

    this.logger.info('CommentsController#findAll.result', result)

    return { data: result }
  }

  @GrpcMethod('CommentsService', 'count')
  async count(query: Query): Promise<Count> {
    this.logger.info('CommentsController#count.call', query)

    const count: number = await this.commentsService.count({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined
    })

    this.logger.info('CommentsController#count.result', count)

    return { count }
  }

  @GrpcMethod('CommentsService', 'create')
  async create(data: CommentDto): Promise<Comment> {
    this.logger.info('CommentsController#create.call', data)

    const result: Comment = await this.commentsService.create(data)

    this.logger.info('CommentsController#create.result', result)

    return result
  }

  @GrpcMethod('CommentsService', 'destroy')
  async destroy(query: Query): Promise<Count> {
    this.logger.info('CommentsController#destroy.call', query)

    const count: number = await this.commentsService.destroy({
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined
    })

    this.logger.info('CommentsController#destroy.result', count)

    return { count }
  }
}
