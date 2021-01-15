import { inject, injectable } from "inversify"
import { Middleware } from "koa"
import { shop_routes } from "../common"
import { ApiAuthRouter } from "../server/context"
import { ShopImageRouter } from "./shop-image-router"
import { ShopService } from "./shop-service"
import { TShopUpdateProps } from "./shop-types"

@injectable()
export class ShopRouter {
  shop_router = new ApiAuthRouter()
  constructor(
    @inject(ShopService) private readonly shopService: ShopService,
    @inject(ShopImageRouter) private readonly imageRouter: ShopImageRouter
  ) {
    this.shop_router.use(
      this.imageRouter.image_router.routes() as Middleware,
      this.imageRouter.image_router.allowedMethods() as Middleware
    )
    this.shop_router.get(shop_routes.root, async (ctx) => {
      ctx.body = await this.shopService.list()
    })
    this.shop_router.get(shop_routes.get, async (ctx) => {
      const { shop_id } = ctx.params
      ctx.body = await this.shopService.getShop(shop_id)
    })
    this.shop_router.post(shop_routes.root, async (ctx) => {
      const data = ctx.request.body as TShopUpdateProps
      ctx.body = await this.shopService.create(data)
    })
    this.shop_router.put(shop_routes.get, async (ctx) => {
      const { shop_id } = ctx.params
      const data = ctx.request.body as TShopUpdateProps
      ctx.body = await this.shopService.update(shop_id, data)
    })
    this.shop_router.patch(shop_routes.upload, async (ctx) => {
      const { shop_id } = ctx.params
      ctx.body = await this.shopService.uploadLogo(shop_id, ctx.req)
    })
    this.shop_router.delete(shop_routes.deleteLogo, async (ctx) => {
      const { shop_id } = ctx.params
      await this.shopService.deleteLogo(shop_id)
      ctx.status = 200
    })
    this.shop_router.delete(shop_routes.get, async (ctx) => {
      const { shop_id } = ctx.params
      ctx.body = await this.shopService.deleteShop(shop_id)
    })
  }
}
