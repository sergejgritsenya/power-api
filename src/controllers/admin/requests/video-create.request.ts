import { IsString } from "class-validator"

export class VideoCreateRequest {
  @IsString()
  url: string
}
