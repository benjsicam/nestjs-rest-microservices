import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { OrganizationsModule } from './organizations/organizations.module'
import { HealthCheckModule } from './health-check/health-check.module'

@Module({
  imports: [ConfigModule.forRoot(), OrganizationsModule, HealthCheckModule]
})
export class AppModule {}
