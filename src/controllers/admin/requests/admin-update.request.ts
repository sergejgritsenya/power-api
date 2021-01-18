import { IsString } from "class-validator"

export class AdminUpdateRequest {
  @IsString()
  email: string
  @IsString()
  login: string
}
