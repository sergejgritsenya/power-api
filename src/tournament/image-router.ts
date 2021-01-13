import { inject, injectable } from "inversify"
import { tournament_routes } from "../common"
import { ApiAuthRouter } from "../server/context"
import { TournamentService } from "./tournament-service"

@injectable()
export class TournamentImageRouter {
  image_router = new ApiAuthRouter()
  constructor(@inject(TournamentService) private readonly tournamentService: TournamentService) {
    this.image_router.post(tournament_routes.image, async (ctx) => {
      const { tournament_id } = ctx.params
      ctx.body = await this.tournamentService.uploadImage(tournament_id, ctx.req)
    })
    this.image_router.delete(tournament_routes.image, async (ctx) => {
      const { tournament_id, image_id } = ctx.params
      ctx.body = await this.tournamentService.deleteImage(tournament_id, image_id)
    })
  }
}
