import { inject, injectable } from "inversify"
import { news_root_routes, news_routes } from "../common/routes"
import { ApiAuthRouter } from "../server/context"
import { NewsService } from "./news-service"
import { TNewsCreateProps, TNewsUpdateProps } from "./news-types"

@injectable()
export class NewsRouter {
  news_router = new ApiAuthRouter()
  constructor(@inject(NewsService) private readonly newsService: NewsService) {
    this.news_router.post(news_root_routes.list, async (ctx) => {
      ctx.body = await this.newsService.list()
    })
    this.news_router.post(news_root_routes.create, async (ctx) => {
      const data = ctx.request.body as TNewsCreateProps
      ctx.body = await this.newsService.create(data)
    })
    this.news_router.post(news_root_routes.delete, async (ctx) => {
      const { news_id } = ctx.request.body as { news_id: string }
      ctx.body = await this.newsService.deleteNews(news_id)
    })
    this.news_router.post(news_routes.get, async (ctx) => {
      const news_id = ctx.params.news_id
      ctx.body = await this.newsService.getNews(news_id)
    })
    this.news_router.post(news_routes.update, async (ctx) => {
      const news_id = ctx.params.news_id
      const data = ctx.request.body as TNewsUpdateProps
      ctx.body = await this.newsService.update(news_id, data)
    })
    this.news_router.post(news_routes.upload, async (ctx) => {
      const { news_id } = ctx.params
      ctx.body = await this.newsService.uploadLogo(news_id, ctx.req)
    })
    this.news_router.post(news_routes.deleteLogo, async (ctx) => {
      const { news_id } = ctx.params
      await this.newsService.deleteLogo(news_id)
      ctx.status = 200
    })
  }
}
