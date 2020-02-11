import { join } from 'path'
import { Transport, ClientOptions } from '@nestjs/microservices'

export const CommentsServiceClientOptions: ClientOptions = {
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
