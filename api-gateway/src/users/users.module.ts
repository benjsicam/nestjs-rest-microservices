import { Module } from '@nestjs/common'

import { UsersServiceClient } from './users-svc.client'

@Module({
  imports: [UsersServiceClient],
  exports: [UsersServiceClient]
})
export class UsersModule {}
