import { join } from 'path'
import { DynamicModule } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

export const CommentsServiceClient: DynamicModule = ClientsModule.register([
  {
    name: 'CommentsServiceClient',
    transport: Transport.GRPC,
    options: {
      url: `${process.env.COMMENTS_SVC_URL}:${process.env.COMMENTS_SVC_PORT}`,
      package: 'comments',
      protoPath: join(__dirname, '../_proto/comments.proto'),
      loader: {
        enums: String,
        objects: true,
        arrays: true
      }
    }
  }
])
