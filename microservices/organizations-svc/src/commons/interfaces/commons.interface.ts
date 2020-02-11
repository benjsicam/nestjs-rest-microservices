export interface Id {
  id: string
}

export interface Name {
  name: string
}

export interface Query {
  attributes?: string[]
  where?: string
  order?: string
  offset?: number
  limit?: number
}

export interface Count {
  count: number
}
