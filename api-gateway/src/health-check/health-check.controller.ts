import { Response } from 'express'

import { Controller, Get, Res, HttpStatus } from '@nestjs/common'

@Controller('/healthz')
export class HealthCheckController {
  @Get()
  healthCheck(@Res() res: Response) {
    res.status(HttpStatus.OK).send('OK')
  }
}
