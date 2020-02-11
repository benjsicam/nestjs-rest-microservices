import { Provider } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'

import { PinoLogger } from 'nestjs-pino'
import { User } from '../users/user.entity'

export const DatabaseProvider: Provider = {
  provide: 'SEQUELIZE',
  useFactory: async (logger: PinoLogger) => {
    logger.setContext('Sequelize')

    const db: Sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      logging: logger.info.bind(logger),
      benchmark: true,
      retry: {
        max: 3
      }
    })

    db.addModels([User])

    await db.sync()

    return db
  },
  inject: [PinoLogger]
}
