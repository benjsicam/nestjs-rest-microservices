import { Module } from '@nestjs/common'

import { CommentsServiceClient } from './comments-svc.client'

@Module({
  imports: [CommentsServiceClient],
  exports: [CommentsServiceClient]
})
export class CommentsModule {}
