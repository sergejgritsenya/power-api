import { IsString } from "class-validator"

export class TournamentUpdateRequest {
  @IsString()
  description: string

  @IsString()
  name: string
}
