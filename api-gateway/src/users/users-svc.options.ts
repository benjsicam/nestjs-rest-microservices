import { join } from 'path'
import { Transport, ClientOptions } from '@nestjs/microservices'

export const UsersServiceClientOptions: ClientOptions = {
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
