import { inject, injectable } from "inversify"
import { Middleware } from "koa"
import { tournament_root_routes, tournament_routes } from "../common/routes"
import { ApiAuthRouter } from "../server/context"
import { TournamentImageRouter } from "./image-router"
import { TournamentService } from "./tournament-service"
import { TTournamentUpdateProps } from "./tournament-types"
import { TournamentVideoRouter } from "./video-router"

@injectable()
export class TournamentRouter {
  tournament_router = new ApiAuthRouter()
  constructor(
    @inject(TournamentService) private readonly tournamentService: TournamentService,
    @inject(TournamentImageRouter) private readonly imageRouter: TournamentImageRouter,
    @inject(TournamentVideoRouter) private readonly videoRouter: TournamentVideoRouter
  ) {
    this.tournament_router.post(tournament_root_routes.list, async (ctx) => {
      ctx.body = await this.tournamentService.list()
    })
    this.tournament_router.post(tournament_root_routes.create, async (ctx) => {
      const data = ctx.request.body as TTournamentUpdateProps
      ctx.body = await this.tournamentService.create(data)
    })
    this.tournament_router.post(tournament_root_routes.delete, async (ctx) => {
      const { tournament_id } = ctx.request.body as { tournament_id: string }
      ctx.body = await this.tournamentService.deleteTournament(tournament_id)
    })
    this.tournament_router.post(tournament_routes.get, async (ctx) => {
      const { tournament_id } = ctx.params
      ctx.body = await this.tournamentService.getTournament(tournament_id)
    })
    this.tournament_router.post(tournament_routes.update, async (ctx) => {
      const { tournament_id } = ctx.params
      const data = ctx.request.body as TTournamentUpdateProps
      ctx.body = await this.tournamentService.update(tournament_id, data)
    })
    this.tournament_router.post(tournament_routes.upload, async (ctx) => {
      const { tournament_id } = ctx.params
      ctx.body = await this.tournamentService.uploadLogo(tournament_id, ctx.req)
    })
    this.tournament_router.post(tournament_routes.deleteLogo, async (ctx) => {
      const { tournament_id } = ctx.params
      await this.tournamentService.deleteLogo(tournament_id)
      ctx.status = 200
    })
    this.tournament_router.use(
      this.imageRouter.image_router.routes() as Middleware,
      this.imageRouter.image_router.allowedMethods() as Middleware
    )
    this.tournament_router.use(
      this.videoRouter.video_router.routes() as Middleware,
      this.videoRouter.video_router.allowedMethods() as Middleware
    )
  }
}
