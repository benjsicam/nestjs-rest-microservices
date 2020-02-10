import { Module } from '@nestjs/common'

import { QueryUtils } from './query.utils'

@Module({
  exports: [QueryUtils],
  providers: [QueryUtils]
})
export class UtilsModule {}
