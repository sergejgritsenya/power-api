import { IsString } from "class-validator"

export class ShopUpdateRequest {
  @IsString()
  description: string

  @IsString()
  name: string

  @IsString()
  price: string
}
