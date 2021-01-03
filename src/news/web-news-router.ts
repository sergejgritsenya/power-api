import { inject, injectable } from "inversify"
import Router from "koa-router"
import { web_news_root_routes, web_news_routes } from "../common/web.routes"
import { NewsService } from "./news-service"

@injectable()
export class WebNewsRouter {
  news_router = new Router()
  constructor(@inject(NewsService) private readonly newsService: NewsService) {
    this.news_router.post(web_news_root_routes.list, async (ctx) => {
      ctx.body = await this.newsService.webList()
    })
    this.news_router.post(web_news_routes.get, async (ctx) => {
      const news_id = ctx.params.news_id
      ctx.body = await this.newsService.webGetNews(news_id)
    })
  }
}
