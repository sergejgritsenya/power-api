import { IsString } from "class-validator"

export class AdminChangePassword {
  @IsString()
  confirm_password: string
  @IsString()
  new_password: string
  @IsString()
  old_password: string
}
