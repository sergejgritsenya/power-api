import { Controller, Get, Param } from "@nestjs/common"
import { NewsService } from "../../services"

@Controller("api/news")
export class NewsWebController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  public async findMany() {
    return this.newsService.findMany()
  }

  @Get(":news_id")
  public async getOne(@Param("news_id") news_id: string) {
    return this.newsService.getOne(news_id)
  }
}
