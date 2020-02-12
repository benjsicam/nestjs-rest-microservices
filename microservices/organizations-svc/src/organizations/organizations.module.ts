import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

import { Organization } from './organization.entity'
import { OrganizationsController } from './organizations.controller'
import { OrganizationsServiceImpl } from './organizations.service'
import { OrganizationsSeeder } from './organizations.seeder'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development'
      }
    })
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsSeeder, { provide: 'OrganizationsService', useClass: OrganizationsServiceImpl }, { provide: 'OrganizationsRepository', useValue: Organization }]
})
export class OrganizationsModule {}
