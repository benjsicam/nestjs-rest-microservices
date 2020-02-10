import { join } from 'path'
import { DynamicModule } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

export const UsersServiceClient: DynamicModule = ClientsModule.register([
  {
    name: 'UsersServiceClient',
    transport: Transport.GRPC,
    options: {
      url: `${process.env.USERS_SVC_URL}:${process.env.USERS_SVC_PORT}`,
      package: 'users',
      protoPath: join(__dirname, '../_proto/users.proto'),
      loader: {
        enums: String,
        objects: true,
        arrays: true
      }
    }
  }
])
