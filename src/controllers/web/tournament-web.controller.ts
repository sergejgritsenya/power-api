import { Controller, Get, Param } from "@nestjs/common"
import { TournamentService } from "../../services"

@Controller("api/tournament")
export class TournamentWebController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get()
  public async findMany() {
    return this.tournamentService.findMany()
  }

  @Get(":tournament_id")
  public async getOne(@Param("tournament_id") tournament_id: string) {
    return this.tournamentService.getOne(tournament_id)
  }
}
