import { inject, injectable } from "inversify"
import Router from "koa-router"
import { admin_auth_routes } from "../common/routes"
import { AuthService } from "./auth-service"
import { TAuthProps } from "./auth-types"

@injectable()
export class AuthRouter {
  auth_router = new Router()
  constructor(@inject(AuthService) private readonly authService: AuthService) {
    this.auth_router.post(admin_auth_routes.login, async (ctx) => {
      const auth_props = ctx.request.body as TAuthProps
      try {
        ctx.body = await this.authService.adminLogin(auth_props)
        ctx.status = 200
      } catch (e) {
        ctx.status = 401
      }
    })
    this.auth_router.post(admin_auth_routes.refresh, async (ctx) => {
      const { refresh_token } = ctx.request.body as { refresh_token: string }
      try {
        ctx.body = await this.authService.adminRefresh(refresh_token)
        ctx.status = 200
      } catch (e) {
        ctx.status = 401
      }
    })
  }
}
