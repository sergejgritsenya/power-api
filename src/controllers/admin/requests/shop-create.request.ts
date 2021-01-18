import { IsString } from "class-validator"

export class ShopCreateRequest {
  @IsString()
  description: string

  @IsString()
  name: string

  @IsString()
  price: string
}
