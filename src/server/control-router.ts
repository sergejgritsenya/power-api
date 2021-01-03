import { inject, injectable } from "inversify"
import { Middleware } from "koa"
import Router from "koa-router"
import { AdminRouter } from "../admin/admin-router"
import { AuthRouter } from "../auth/auth-router"
import { NewsRouter } from "../news/news-router"
import { ShopRouter } from "../shop/shop-router"
import { TournamentRouter } from "../tournament/tournament-router"
import { authMidlleware } from "./middleware"

@injectable()
export class ControlRouter {
  control_router = new Router()
  constructor(
    @inject(AuthRouter) private readonly authRouter: AuthRouter,
    @inject(AdminRouter) private readonly adminRouter: AdminRouter,
    @inject(TournamentRouter) private readonly tournamentRouter: TournamentRouter,
    @inject(NewsRouter) private readonly newsRouter: NewsRouter,
    @inject(ShopRouter) private readonly shopRouter: ShopRouter
  ) {
    this.control_router.use(
      this.authRouter.auth_router.routes() as Middleware,
      this.authRouter.auth_router.allowedMethods() as Middleware
    )
    this.control_router.use(authMidlleware)
    this.control_router.use(
      this.adminRouter.admin_router.routes() as Middleware,
      this.adminRouter.admin_router.allowedMethods() as Middleware
    )
    this.control_router.use(
      this.tournamentRouter.tournament_router.routes() as Middleware,
      this.tournamentRouter.tournament_router.allowedMethods() as Middleware
    )
    this.control_router.use(
      this.newsRouter.news_router.routes() as Middleware,
      this.newsRouter.news_router.allowedMethods() as Middleware
    )
    this.control_router.use(
      this.shopRouter.shop_router.routes() as Middleware,
      this.shopRouter.shop_router.allowedMethods() as Middleware
    )
  }
}
