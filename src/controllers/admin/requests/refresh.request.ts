import { IsString } from "class-validator"

export class RefreshRequest {
  @IsString()
  refresh_token: string
}
