export class UserDto {
  readonly id?: string

  readonly organization: string

  readonly loginId: string

  readonly avatar?: string

  readonly followers?: number

  readonly following?: number
}
