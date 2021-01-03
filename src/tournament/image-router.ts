import { inject, injectable } from "inversify"
import { tournament_image_routes } from "../common/routes"
import { ApiAuthRouter } from "../server/context"
import { TournamentService } from "./tournament-service"

@injectable()
export class TournamentImageRouter {
  image_router = new ApiAuthRouter()
  constructor(@inject(TournamentService) private readonly tournamentService: TournamentService) {
    this.image_router.post(tournament_image_routes.upload, async (ctx) => {
      const { tournament_id } = ctx.params
      ctx.body = await this.tournamentService.uploadImage(tournament_id, ctx.req)
    })
    this.image_router.post(tournament_image_routes.delete, async (ctx) => {
      const { tournament_id } = ctx.params
      const { image_id } = ctx.request.body as { image_id: string }
      ctx.body = await this.tournamentService.deleteImage(tournament_id, image_id)
    })
  }
}
