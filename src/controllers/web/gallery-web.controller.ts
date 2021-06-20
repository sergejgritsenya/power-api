import { Controller, Get } from "@nestjs/common"
import { GalleryService } from "../../services"

@Controller("api/gallery")
export class GalleryWebController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  public async findMany() {
    return this.galleryService.findMany()
  }
}
