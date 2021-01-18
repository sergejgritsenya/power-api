import { Controller, Get, Param } from "@nestjs/common"
import { ShopService } from "../../services"

@Controller("api/shop")
export class ShopWebController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  public async findMany() {
    return this.shopService.findMany()
  }

  @Get(":shop_id")
  public async getOne(@Param("shop_id") shop_id: string) {
    return this.shopService.getOne(shop_id)
  }
}
