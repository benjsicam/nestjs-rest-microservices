import { PinoLogger } from 'nestjs-pino'
import { ClientGrpc, Client } from '@nestjs/microservices'
import { Controller, Get, Post, Delete, Query, Body, Param, Inject, OnModuleInit, NotFoundException, Header } from '@nestjs/common'
import { isEmpty } from 'lodash'

import { QueryUtils } from '../utils/query.utils'
import { Count } from '../commons/interfaces/commons.interface'
import { RequestQuery, QueryResponse } from '../commons/interfaces/request-response.interface'

import { CommentsService, Comment, CommentsQueryResult } from '../comments/comments.interface'
import { OrganizationsService, Organization, OrganizationsQueryResult } from './organizations.interface'
import { UsersService, UsersQueryResult } from '../users/users.interface'

import { CommentDto } from '../comments/comment.dto'

import { CommentsServiceClientOptions } from '../comments/comments-svc.options'
import { OrganizationsServiceClientOptions } from './organization-svc.options'
import { UsersServiceClientOptions } from '../users/users-svc.options'

@Controller('orgs')
export class OrganizationController implements OnModuleInit {
  constructor(@Inject('QueryUtils') private readonly queryUtils: QueryUtils, private readonly logger: PinoLogger) {
    logger.setContext(OrganizationController.name)
  }

  @Client(CommentsServiceClientOptions)
  private readonly commentsServiceClient: ClientGrpc

  @Client(OrganizationsServiceClientOptions)
  private readonly organizationsServiceClient: ClientGrpc

  @Client(UsersServiceClientOptions)
  private readonly usersServiceClient: ClientGrpc

  private commentsService: CommentsService

  private organizationsService: OrganizationsService

  private usersService: UsersService

  onModuleInit() {
    this.commentsService = this.commentsServiceClient.getService<CommentsService>('CommentsService')
    this.organizationsService = this.organizationsServiceClient.getService<OrganizationsService>('OrganizationsService')
    this.usersService = this.usersServiceClient.getService<UsersService>('UsersService')
  }

  @Get()
  @Header('Content-Type', 'application/json')
  async findOrganizations(@Query() query: RequestQuery): Promise<QueryResponse> {
    this.logger.info('OrganizationController#findOrganizations.call', query)

    const args = {
      ...(await this.queryUtils.getQueryParams(query))
    }

    const { count } = await this.organizationsService
      .count({
        where: !isEmpty(query.q) ? JSON.stringify({ name: { $like: query.q } }) : undefined
      })
      .toPromise()

    const data: OrganizationsQueryResult = await this.organizationsService
      .findAll({
        attributes: args.attributes,
        where: !isEmpty(query.q) ? JSON.stringify({ name: { $like: query.q } }) : undefined,
        order: JSON.stringify(args.order),
        offset: args.offset,
        limit: args.limit
      })
      .toPromise()

    const result: QueryResponse = {
      totalRecords: count,
      totalPages: Math.ceil(count / args.limit),
      page: args.page,
      limit: args.limit,
      ...data
    }

    this.logger.info('OrganizationController#findOrganizations.result', result)

    return result
  }

  @Get(':name/members')
  @Header('Content-Type', 'application/json')
  async findOrganizationMembers(@Param('name') name: string, @Query() query: RequestQuery): Promise<QueryResponse> {
    this.logger.info('OrganizationController#findOrganizationMembers.call', query)

    const organization: Organization = await this.organizationsService
      .findByName({
        name
      })
      .toPromise()

    if (!organization) throw new NotFoundException('NOT_FOUND', 'Organization not found.')

    const where = { organization: organization.id }

    if (!isEmpty(query.q)) {
      Object.assign(where, {
        name: { $like: query.q }
      })
    }

    const args = {
      ...(await this.queryUtils.getQueryParams(query))
    }

    const { count } = await this.usersService
      .count({
        where: JSON.stringify(where)
      })
      .toPromise()

    const data: UsersQueryResult = await this.usersService
      .findAll({
        attributes: args.attributes,
        where: JSON.stringify(where),
        order: !isEmpty(args.order) ? JSON.stringify(args.order) : JSON.stringify([['followers', 'DESC']]),
        offset: args.offset,
        limit: args.limit
      })
      .toPromise()

    const result: QueryResponse = {
      totalRecords: count,
      totalPages: Math.ceil(count / args.limit),
      page: args.page,
      limit: args.limit,
      ...data
    }

    this.logger.info('OrganizationController#findOrganizationMembers.result', result)

    return result
  }

  @Get(':name/comments')
  @Header('Content-Type', 'application/json')
  async findOrganizationComments(@Param('name') name: string, @Query() query: RequestQuery): Promise<QueryResponse> {
    this.logger.info('OrganizationController#findOrganizationComments.call', query)

    const organization: Organization = await this.organizationsService
      .findByName({
        name
      })
      .toPromise()

    if (!organization) throw new NotFoundException('NOT_FOUND', 'Organization not found.')

    const where = { organization: organization.id }

    if (!isEmpty(query.q)) {
      Object.assign(where, {
        name: { $like: query.q }
      })
    }

    const args = {
      ...(await this.queryUtils.getQueryParams(query))
    }

    const { count } = await this.commentsService
      .count({
        where: JSON.stringify(where)
      })
      .toPromise()

    const data: CommentsQueryResult = await this.commentsService
      .findAll({
        attributes: args.attributes,
        where: JSON.stringify(where),
        order: JSON.stringify(args.order),
        offset: args.offset,
        limit: args.limit
      })
      .toPromise()

    const result: QueryResponse = {
      totalRecords: count,
      totalPages: Math.ceil(count / args.limit),
      page: args.page,
      limit: args.limit,
      ...data
    }

    this.logger.info('OrganizationController#findOrganizationComments.call', result)

    return result
  }

  @Post(':name/comments')
  @Header('Content-Type', 'application/json')
  async createOrganizationComment(@Param('name') name: string, @Body() comment: CommentDto): Promise<Comment> {
    this.logger.info('OrganizationController#createOrganizationComment.call', name)

    const organization: Organization = await this.organizationsService
      .findByName({
        name
      })
      .toPromise()

    if (!organization) throw new NotFoundException('NOT_FOUND', 'Organization not found.')

    const result: Comment = await this.commentsService
      .create({
        ...comment,
        organization: organization.id
      })
      .toPromise()

    this.logger.info('OrganizationController#createOrganizationComment.result', result)

    return result
  }

  @Delete(':name/comments')
  @Header('Content-Type', 'application/json')
  async deleteOrganizationComments(@Param('name') name: string): Promise<Count> {
    this.logger.info('OrganizationController#deleteOrganizationComments.call', name)

    const organization: Organization = await this.organizationsService
      .findByName({
        name
      })
      .toPromise()

    if (!organization) throw new NotFoundException('NOT_FOUND', 'Organization not found.')

    const result: Count = await this.commentsService
      .destroy({
        where: JSON.stringify({ organization: organization.id })
      })
      .toPromise()

    this.logger.info('OrganizationController#deleteOrganizationComments.result', result)

    return result
  }
}
