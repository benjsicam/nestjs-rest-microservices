import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

import { User } from './user.entity'
import { UsersController } from './users.controller'
import { UsersServiceImpl } from './users.service'
import { UsersSeeder } from './users.seeder'

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        safe: true,
        prettyPrint: process.env.NODE_ENV === 'development'
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersSeeder, { provide: 'UsersService', useClass: UsersServiceImpl }, { provide: 'UsersRepository', useValue: User }]
})
export class UsersModule {}
