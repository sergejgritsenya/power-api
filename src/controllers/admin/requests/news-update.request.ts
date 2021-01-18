import { IsBoolean, IsOptional, IsString } from "class-validator"

export class NewsUpdateRequest {
  @IsBoolean()
  publish: boolean

  @IsString()
  text: string

  @IsString()
  title: string

  @IsOptional()
  @IsString()
  tournament_id?: string
}
