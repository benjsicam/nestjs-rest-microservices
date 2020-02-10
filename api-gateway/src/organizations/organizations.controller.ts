import { PinoLogger } from 'nestjs-pino'
import { ClientGrpc } from '@nestjs/microservices'
import { Controller, HttpCode, Get, Post, Delete, Query, Body, Param, Inject, OnModuleInit, NotFoundException } from '@nestjs/common'

import { QueryUtils } from '../utils/query.utils'
import { RequestQuery, Count, QueryResponse } from '../commons/interfaces/request-response.interface'

import { CommentsService, Comment } from '../comments/interfaces/comments.interface'
import { UsersService } from '../users/interfaces/users.interface'
import { OrganizationsService, Organization } from './interfaces/organizations.interface'

import { CommentDto } from '../comments/dtos/comment.dto'

@Controller('orgs')
export class OrganizationController implements OnModuleInit {
  private commentsService: CommentsService

  private organizationsService: OrganizationsService

  private usersService: UsersService

  constructor(
    @Inject('CommentsServiceClient') private readonly commentsServiceClient: ClientGrpc,
    @Inject('OrganizationsServiceClient') private readonly organizationsServiceClient: ClientGrpc,
    @Inject('UsersServiceClient') private readonly usersServiceClient: ClientGrpc,
    @Inject('QueryUtils') private readonly queryUtils: QueryUtils,
    private readonly logger: PinoLogger
  ) {
    logger.setContext(OrganizationController.name)
  }

  onModuleInit() {
    this.commentsService = this.commentsServiceClient.getService<CommentsService>('CommentsService')
    this.organizationsService = this.organizationsServiceClient.getService<OrganizationsService>('OrganizationsService')
    this.usersService = this.usersServiceClient.getService<UsersService>('UsersService')
  }

  @Get()
  async findOrganizations(@Query() query: RequestQuery): Promise<QueryResponse> {
    this.logger.info('OrganizationController#findOrganizations.call', query)

    const args = {
      count: await this.organizationsService.count({
        where: query.q ? { name: { $like: query.q } } : undefined
      }),
      ...(await this.queryUtils.getQueryParams(query))
    }

    const { count } = args.count

    const result = {
      totalRecords: count,
      totalPages: count / args.limit,
      page: args.page,
      limit: args.limit,
      data: await this.organizationsService.findAll({
        attributes: args.attributes,
        where: query.q ? JSON.stringify({ name: { $like: query.q } }) : undefined,
        order: JSON.stringify(args.order),
        offset: args.offset,
        limit: args.limit
      })
    }

    this.logger.info('OrganizationController#findOrganizations.result', result)

    return result
  }

  @Get(':name/members')
  async findOrganizationMembers(@Param('name') name: string, @Query() query: RequestQuery): Promise<QueryResponse> {
    this.logger.info('OrganizationController#findOrganizationMembers.call', query)

    const organization: Organization = await this.organizationsService.findOne({
      where: JSON.stringify({
        name
      })
    })

    if (!organization) throw new NotFoundException('NOT_FOUND', 'Organization not found.')

    const args = {
      count: await this.usersService.count({
        where: query.q ? { name: { $like: query.q } } : undefined
      }),
      ...(await this.queryUtils.getQueryParams(query))
    }

    const { count } = args.count
    const where = { organization: organization.id }

    if (query.q) {
      Object.assign(where, {
        name: { $like: query.q }
      })
    }

    const result = {
      totalRecords: count,
      totalPages: count / args.limit,
      page: args.page,
      limit: args.limit,
      data: await this.usersService.findAll({
        attributes: args.attributes,
        where: JSON.stringify(where),
        order: JSON.stringify(args.order),
        offset: args.offset,
        limit: args.limit
      })
    }

    this.logger.info('OrganizationController#findOrganizationMembers.result', result)

    return result
  }

  @Get(':name/comments')
  async findOrganizationComments(@Param('name') name: string, @Query() query: RequestQuery): Promise<QueryResponse> {
    this.logger.info('OrganizationController#findOrganizationComments.call', query)

    const organization: Organization = await this.organizationsService.findOne({
      where: JSON.stringify({
        name
      })
    })

    if (!organization) throw new NotFoundException('NOT_FOUND', 'Organization not found.')

    const args = {
      count: await this.commentsService.count({
        where: query.q ? { name: { $like: query.q } } : undefined
      }),
      ...(await this.queryUtils.getQueryParams(query))
    }

    const { count } = args.count
    const where = { organization: organization.id }

    if (query.q) {
      Object.assign(where, {
        name: { $like: query.q }
      })
    }

    const result = {
      totalRecords: count,
      totalPages: count / args.limit,
      page: args.page,
      limit: args.limit,
      data: await this.commentsService.findAll({
        attributes: args.attributes,
        where: JSON.stringify(where),
        order: JSON.stringify(args.order),
        offset: args.offset,
        limit: args.limit
      })
    }

    this.logger.info('OrganizationController#findOrganizationComments.call', result)

    return result
  }

  @Post(':name/comments')
  async createOrganizationComment(@Param('name') name: string, @Query('select') select: string, @Body() comment: CommentDto): Promise<Comment> {
    this.logger.info('OrganizationController#createOrganizationComment.call', name, select)

    const result = await this.commentsService.create(comment)

    this.logger.info('OrganizationController#createOrganizationComment.result', result)

    return result
  }

  @Delete(':name/comments')
  @HttpCode(204)
  async deleteOrganizationComments(@Param('name') name: string): Promise<Count> {
    this.logger.info('OrganizationController#deleteOrganizationComments.call', name)

    const organization: Organization = await this.organizationsService.findOne({
      where: JSON.stringify({
        name
      })
    })

    if (!organization) throw new NotFoundException('NOT_FOUND', 'Organization not found.')

    const result = await this.commentsService.destroy({
      where: JSON.stringify({ organization: organization.id })
    })

    this.logger.info('OrganizationController#deleteOrganizationComments.result', result)

    return result
  }
}
