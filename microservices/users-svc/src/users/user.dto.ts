export class UserDto {
  readonly organization: string

  readonly loginId: string

  readonly avatar?: string

  readonly followers?: number

  readonly following?: number
}
