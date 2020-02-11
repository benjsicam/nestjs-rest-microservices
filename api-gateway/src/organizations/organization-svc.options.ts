import { join } from 'path'
import { ClientOptions, Transport } from '@nestjs/microservices'

export const OrganizationsServiceClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${process.env.ORGANIZATIONS_SVC_URL}:${process.env.ORGANIZATIONS_SVC_PORT}`,
    package: 'organizations',
    protoPath: join(__dirname, '../_proto/organizations.proto'),
    loader: {
      enums: String,
      objects: true,
      arrays: true
    }
  }
}
