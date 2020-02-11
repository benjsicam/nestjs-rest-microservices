import { Injectable } from '@nestjs/common'
import { isNaN, isEmpty } from 'lodash'

import { RequestQuery } from '../commons/interfaces/request-response.interface'

@Injectable()
export class QueryUtils {
  async getQueryParams(query: RequestQuery): Promise<any> {
    return {
      attributes: await this.getAttributes(query.select),
      order: await this.getOrder(query.orderBy),
      offset: await this.getOffset(query.page, query.limit),
      page: !isNaN(query.page) ? query.page : 1,
      limit: await this.getLimit(query.limit)
    }
  }

  async getAttributes(attributes: string): Promise<Array<string>> {
    return !isEmpty(attributes) ? attributes.split(',') : undefined
  }

  async getLimit(limit: number): Promise<number> {
    let result = 25

    if (!isNaN(limit) && limit > 0) result = limit

    return result
  }

  async getOffset(page: number, limit: number): Promise<number> {
    let result = 0

    if (!isNaN(page) && page > 0) result = (page - 1) * limit

    return result
  }

  async getOrder(orderBy: string): Promise<Array<Array<string>>> {
    const result: Array<Array<string>> = []

    if (!isEmpty(orderBy)) {
      const fields: Array<string> = orderBy.split(',')

      fields.forEach(field => {
        if (field.trim().charAt(0) !== '-') {
          result.push([field.trim(), 'ASC'])
        } else {
          result.push([field.trim().substr(1), 'DESC'])
        }
      })
    }

    return result
  }
}
