import { Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common"
import { Request } from "express"
import { GalleryService } from "../../services"
import { AuthGuard } from "../guards"

@UseGuards(AuthGuard)
@Controller("control/gallery")
export class GalleryAdminController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  public async findMany() {
    return this.galleryService.findMany()
  }

  @Get(":gallery_id")
  public async getOne(@Param("gallery_id") gallery_id: string) {
    return this.galleryService.getOne(gallery_id)
  }

  @Post()
  public async createOne(@Req() req: Request) {
    return this.galleryService.createOne(req)
  }

  @Patch(":gallery_id")
  public async updateOne(@Param("gallery_id") id: string, @Req() req: Request) {
    return this.galleryService.updateOne(id, req)
  }

  @Delete(":gallery_id")
  public async deleteOne(@Param("gallery_id") gallery_id: string) {
    return this.galleryService.deleteOne(gallery_id)
  }
}
