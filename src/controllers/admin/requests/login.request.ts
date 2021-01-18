import { IsString } from "class-validator"

export class LoginRequest {
  @IsString()
  login: string
  @IsString()
  password: string
}
