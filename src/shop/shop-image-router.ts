import { inject, injectable } from "inversify"
import { shop_image_routes } from "../common/routes"
import { ApiAuthRouter } from "../server/context"
import { ShopService } from "./shop-service"

@injectable()
export class ShopImageRouter {
  image_router = new ApiAuthRouter()
  constructor(@inject(ShopService) private readonly shopService: ShopService) {
    this.image_router.post(shop_image_routes.upload, async (ctx) => {
      const { shop_id } = ctx.params
      ctx.body = await this.shopService.uploadImage(shop_id, ctx.req)
    })
    this.image_router.post(shop_image_routes.delete, async (ctx) => {
      const { shop_id } = ctx.params
      const { image_id } = ctx.request.body as { image_id: string }
      ctx.body = await this.shopService.deleteImage(shop_id, image_id)
    })
  }
}
