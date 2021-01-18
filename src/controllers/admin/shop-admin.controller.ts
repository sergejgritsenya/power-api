import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common"
import { Request } from "express"
import { ShopService } from "../../services"
import { AuthGuard } from "../guards"
import { ShopCreateRequest, ShopUpdateRequest } from "./requests"

@UseGuards(AuthGuard)
@Controller("control/shop")
export class ShopAdminController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  public async findMany() {
    return this.shopService.findMany()
  }

  @Get(":shop_id")
  public async getOne(@Param("shop_id") shop_id: string) {
    return this.shopService.getOne(shop_id)
  }

  @Post()
  public async createOne(@Body() request: ShopCreateRequest) {
    return this.shopService.createOne(request)
  }

  @Patch(":shop_id")
  public async updateOne(
    @Body() request: ShopUpdateRequest,
    @Param("shop_id") id: string
  ) {
    return this.shopService.updateOne({ id, ...request })
  }

  @Delete(":shop_id")
  public async deleteOne(@Param("shop_id") shop_id: string) {
    return this.shopService.deleteOne(shop_id)
  }

  @Put("upload/:shop_id")
  public async uploadLogo(@Param("shop_id") shop_id: string, @Req() req: Request) {
    return this.shopService.uploadLogo(shop_id, req)
  }

  @Delete("deleteLogo/:shop_id")
  public async deleteLogo(@Param("shop_id") shop_id: string) {
    return this.shopService.deleteLogo(shop_id)
  }

  @Put("image/:shop_id")
  public async uploadImage(@Param("shop_id") shop_id: string, @Req() req: Request) {
    return this.shopService.uploadImage(shop_id, req)
  }

  @Delete("image/:image_id")
  public async deleteImage(@Param("image_id") image_id: string) {
    return this.shopService.deleteImage(image_id)
  }
}
