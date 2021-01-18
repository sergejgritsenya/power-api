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
import { NewsService } from "../../services"
import { AuthGuard } from "../guards"
import { NewsCreateRequest, NewsUpdateRequest } from "./requests"

@UseGuards(AuthGuard)
@Controller("control/news")
export class NewsAdminController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  public async findMany() {
    return this.newsService.findMany()
  }

  @Get(":news_id")
  public async getOne(@Param("news_id") news_id: string) {
    return this.newsService.getOne(news_id)
  }

  @Post()
  public async createOne(@Body() request: NewsCreateRequest) {
    return this.newsService.createOne(request)
  }

  @Patch(":news_id")
  public async updateOne(
    @Body() request: NewsUpdateRequest,
    @Param("news_id") id: string
  ) {
    return this.newsService.updateOne({ id, ...request })
  }

  @Delete(":news_id")
  public async deleteOne(@Param("news_id") news_id: string) {
    return this.newsService.deleteOne(news_id)
  }

  @Put("upload/:news_id")
  public async uploadLogo(@Param("news_id") news_id: string, @Req() req: Request) {
    return this.newsService.uploadLogo(news_id, req)
  }

  @Delete("deleteLogo/:news_id")
  public async deleteLogo(@Param("news_id") news_id: string) {
    return this.newsService.deleteLogo(news_id)
  }
}
