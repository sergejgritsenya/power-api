import { inject, injectable } from "inversify"
import { tournament_video_routes } from "../common/routes"
import { ApiAuthRouter } from "../server/context"
import { TournamentService } from "./tournament-service"
import { TTournamentVideoCreateProps } from "./tournament-types"

@injectable()
export class TournamentVideoRouter {
  video_router = new ApiAuthRouter()
  constructor(@inject(TournamentService) private readonly tournamentService: TournamentService) {
    this.video_router.post(tournament_video_routes.create, async (ctx) => {
      const { tournament_id } = ctx.params
      const data = ctx.request.body as TTournamentVideoCreateProps
      ctx.body = await this.tournamentService.createVideo(tournament_id, data)
    })
    this.video_router.post(tournament_video_routes.delete, async (ctx) => {
      const { tournament_id } = ctx.params
      const { video_id } = ctx.request.body as { video_id: string }
      ctx.body = await this.tournamentService.deleteVideo(tournament_id, video_id)
    })
  }
}
