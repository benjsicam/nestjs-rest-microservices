import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import { HealthCheckModule } from './health-check/health-check.module'
import { OrganizationsModule } from './organizations/organizations.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development'
      }
    }),
    HealthCheckModule,
    OrganizationsModule
  ]
})
export class AppModule {}
