import { IsString } from "class-validator"

export class AdminCreateRequest {
  @IsString()
  login: string
  @IsString()
  email: string
  @IsString()
  password: string
  @IsString()
  confirm_password: string
}
