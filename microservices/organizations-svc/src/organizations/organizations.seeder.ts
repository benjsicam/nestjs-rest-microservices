import { PinoLogger } from 'nestjs-pino'
import { Inject, Injectable } from '@nestjs/common'
import { company, helpers } from 'faker'
import { forEach } from 'lodash'

import { OrganizationsService } from './organizations.interface'
import { Organization } from './organization.entity'

@Injectable()
export class OrganizationsSeeder {
  private readonly ORGS: Array<string> = ['62a1c874-1f3f-4e24-a553-05289eea6332', 'f891fa17-d33f-49cb-baea-ced2539fa574']

  constructor(@Inject('OrganizationsService') private readonly service: OrganizationsService, private readonly logger: PinoLogger) {
    logger.setContext(OrganizationsSeeder.name)
  }

  async seedDatabase(): Promise<number> {
    const recordCount: number = await this.service.count()

    if (recordCount > 0) {
      this.logger.info('OrganizationsSeeder#seedDatabase', 'Aborting...')

      return recordCount
    }

    forEach(this.ORGS, async id => {
      const organization: Organization = await this.service.create({
        id,
        name: helpers.slugify(company.companyName(1))
      })

      this.logger.info('OrganizationsSeeder#seedDatabase.newRecord', organization)
    })

    return this.ORGS.length
  }
}
