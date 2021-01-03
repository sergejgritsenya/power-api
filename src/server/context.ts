import Router from "koa-router"

export type TAuthContext = {
  admin_id?: string
}
export class ApiAuthRouter extends Router<{}, TAuthContext> {}
