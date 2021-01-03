import { inject, injectable } from "inversify"
import Router from "koa-router"
import { web_shop_root_routes, web_shop_routes } from "../common/web.routes"
import { ShopService } from "./shop-service"

@injectable()
export class WebShopRouter {
  shop_router = new Router()
  constructor(@inject(ShopService) private readonly shopService: ShopService) {
    this.shop_router.post(web_shop_root_routes.list, async (ctx) => {
      ctx.body = await this.shopService.list()
    })
    this.shop_router.post(web_shop_routes.get, async (ctx) => {
      const { shop_id } = ctx.params
      ctx.body = await this.shopService.getShop(shop_id)
    })
  }
}
