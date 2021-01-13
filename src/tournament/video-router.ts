import { inject, injectable } from "inversify"
import { tournament_routes } from "../common"
import { ApiAuthRouter } from "../server/context"
import { TournamentService } from "./tournament-service"
import { TTournamentVideoCreateProps } from "./tournament-types"

@injectable()
export class TournamentVideoRouter {
  video_router = new ApiAuthRouter()
  constructor(@inject(TournamentService) private readonly tournamentService: TournamentService) {
    this.video_router.post(tournament_routes.video, async (ctx) => {
      const { tournament_id } = ctx.params
      const data = ctx.request.body as TTournamentVideoCreateProps
      ctx.body = await this.tournamentService.createVideo(tournament_id, data)
    })
    this.video_router.delete(tournament_routes.deleteVideo, async (ctx) => {
      const { tournament_id, video_id } = ctx.params
      ctx.body = await this.tournamentService.deleteVideo(tournament_id, video_id)
    })
  }
}
