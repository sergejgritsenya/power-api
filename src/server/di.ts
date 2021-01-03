import { PrismaClient } from "@prisma/client"
import { Container, interfaces } from "inversify"
import Router from "koa-router"
import "reflect-metadata"
import { AdminRouter } from "../admin/admin-router"
import { AdminService } from "../admin/admin-service"
import { AuthRouter } from "../auth/auth-router"
import { AuthService } from "../auth/auth-service"
import { NewsRouter } from "../news/news-router"
import { NewsService } from "../news/news-service"
import { WebNewsRouter } from "../news/web-news-router"
import { ShopImageRouter } from "../shop/shop-image-router"
import { ShopRouter } from "../shop/shop-router"
import { ShopService } from "../shop/shop-service"
import { WebShopRouter } from "../shop/web-shop-router"
import { TournamentImageRouter } from "../tournament/image-router"
import { TournamentRouter } from "../tournament/tournament-router"
import { TournamentService } from "../tournament/tournament-service"
import { TournamentVideoRouter } from "../tournament/video-router"
import { WebTournamentRouter } from "../tournament/web-tournament-router"
import { ControlRouter } from "./control-router"
import { api_env, TEnv } from "./env"
import { PrismaService } from "./prisma-service"
import { AppRouter } from "./router"
import { appSymbols } from "./symbols"
import { WebRouter } from "./web-router"

const app_dependencies: interfaces.ServiceIdentifier<any>[] = [PrismaService]
const singletones: interfaces.ServiceIdentifier<any>[] = [
  AuthService,
  AdminService,
  TournamentService,
  NewsService,
  ShopService,
]
const routers: interfaces.ServiceIdentifier<any>[] = [
  AppRouter,
  ControlRouter,
  AuthRouter,
  WebRouter,
  AdminRouter,
  TournamentRouter,
  TournamentImageRouter,
  TournamentVideoRouter,
  NewsRouter,
  ShopRouter,
  ShopImageRouter,
  WebTournamentRouter,
  WebShopRouter,
  WebNewsRouter,
]

export type TInitServerProps = { container: Container; router: Router }
export class ApiDiService {
  container = new Container()
  init = async (): Promise<TInitServerProps> => {
    this.bindAppDeps()
    const { app_router } = this.container.get(AppRouter)
    return { container: this.container, router: app_router }
  }
  private bindAppDeps = () => {
    app_dependencies.forEach(this.bindSingleton())
    singletones.forEach(this.bindSingleton())
    routers.forEach((router) => this.container.bind(router).toSelf())
    const prisma: PrismaClient = this.container.get(PrismaService).prisma
    this.container.bind<PrismaClient>(appSymbols.prisma).toConstantValue(prisma)
    this.container.bind<TEnv>(appSymbols.env).toConstantValue(api_env)
  }
  private bindSingleton = () => (singleton: interfaces.ServiceIdentifier<any>) => {
    this.container.bind(singleton).toSelf().inSingletonScope()
  }
}
