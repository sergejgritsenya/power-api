import { inject, injectable } from "inversify"
import { news_routes } from "../common"
import { ApiAuthRouter } from "../server/context"
import { NewsService } from "./news-service"
import { TNewsCreateProps, TNewsUpdateProps } from "./news-types"

@injectable()
export class NewsRouter {
  news_router = new ApiAuthRouter()
  constructor(@inject(NewsService) private readonly newsService: NewsService) {
    this.news_router.get(news_routes.root, async (ctx) => {
      ctx.body = await this.newsService.list()
    })
    this.news_router.get(news_routes.get, async (ctx) => {
      const { news_id } = ctx.params
      ctx.body = await this.newsService.getNews(news_id)
    })
    this.news_router.post(news_routes.root, async (ctx) => {
      const data = ctx.request.body as TNewsCreateProps
      ctx.body = await this.newsService.create(data)
    })
    this.news_router.put(news_routes.get, async (ctx) => {
      const { news_id } = ctx.params
      const data = ctx.request.body as TNewsUpdateProps
      ctx.body = await this.newsService.update(news_id, data)
    })
    this.news_router.patch(news_routes.upload, async (ctx) => {
      const { news_id } = ctx.params
      ctx.body = await this.newsService.uploadLogo(news_id, ctx.req)
    })
    this.news_router.patch(news_routes.deleteLogo, async (ctx) => {
      const { news_id } = ctx.params
      await this.newsService.deleteLogo(news_id)
      ctx.status = 200
    })
    this.news_router.delete(news_routes.get, async (ctx) => {
      const { news_id } = ctx.params
      ctx.body = await this.newsService.deleteNews(news_id)
    })
  }
}
