import { IsString } from "class-validator"

export class NewsCreateRequest {
  @IsString()
  text: string
  @IsString()
  title: string
}
