export interface RequestQuery {
  q: string
  select: string
  orderBy: string
  page: number
  limit: number
}

export interface QueryResponse {
  totalRecords: number
  totalPages: number
  page: number
  limit: number
  data: Array<any>
}
