import { inject, injectable } from "inversify"
import { shop_routes } from "../common"
import { ApiAuthRouter } from "../server/context"
import { ShopService } from "./shop-service"

@injectable()
export class ShopImageRouter {
  image_router = new ApiAuthRouter()
  constructor(@inject(ShopService) private readonly shopService: ShopService) {
    this.image_router.get(shop_routes.image, async (ctx) => {
      const { shop_id } = ctx.params
      ctx.body = await this.shopService.uploadImage(shop_id, ctx.req)
    })
    this.image_router.delete(shop_routes.deleteImage, async (ctx) => {
      const { shop_id, image_id } = ctx.params
      ctx.body = await this.shopService.deleteImage(shop_id, image_id)
    })
  }
}
