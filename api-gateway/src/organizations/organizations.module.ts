import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

import { CommentsModule } from '../comments/comments.module'
import { UsersModule } from '../users/users.module'

import { UtilsModule } from '../utils/utils.module'

import { OrganizationController } from './organizations.controller'

import { OrganizationsServiceClient } from './organization-svc.client'

@Module({
  imports: [
    CommentsModule,
    UsersModule,
    UtilsModule,
    OrganizationsServiceClient,
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development'
      }
    })
  ],
  exports: [OrganizationsServiceClient],
  controllers: [OrganizationController]
})
export class OrganizationsModule {}
