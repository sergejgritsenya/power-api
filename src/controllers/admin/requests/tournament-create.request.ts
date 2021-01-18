import { IsString } from "class-validator"

export class TournamentCreateRequest {
  @IsString()
  description: string

  @IsString()
  name: string
}
