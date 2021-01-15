import { PrismaClient } from "@prisma/client"
import { IncomingMessage } from "http"
import { inject, injectable } from "inversify"
import { PrismaService } from "../server/prisma-service"
import { uploadToS3 } from "../upload-file"
import {
  TNews,
  TNewsAdmin,
  TNewsCreateProps,
  TNewsList,
  TNewsUpdateProps,
  TWebNewsList,
} from "./news-types"

@injectable()
export class NewsService {
  prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  list = async (): Promise<TNewsList[]> => {
    const news_list = await this.prisma.news.findMany({
      select: { id: true, title: true, publish: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return news_list
  }
  getNews = async (id: string): Promise<TNewsAdmin> => {
    const [db_news, tournaments] = await Promise.all([
      this.prisma.news.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          publish: true,
          logo: true,
          text: true,
          tournament: { select: { id: true } },
        },
      }),
      this.prisma.tournament.findMany({ select: { id: true, name: true } }),
    ])
    if (!db_news || !tournaments) {
      throw new Error("Unknown news")
    }
    const news: TNews = {
      id: db_news.id,
      title: db_news.title,
      publish: db_news.publish,
      logo: db_news.logo,
      text: db_news.text,
      tournament_id: db_news.tournament ? db_news.tournament.id : null,
    }
    return { news, tournaments }
  }
  create = async (data: TNewsCreateProps): Promise<string> => {
    const news = await this.prisma.news.create({ data })
    return news.id
  }
  update = async (id: string, props: TNewsUpdateProps): Promise<TNewsAdmin> => {
    const data = {
      title: props.title,
      publish: props.publish,
      text: props.text,
      tournament: props.tournament_id ? { connect: { id: props.tournament_id } } : undefined,
    }
    const [db_news, tournaments] = await Promise.all([
      this.prisma.news.update({
        where: { id },
        data,
        select: {
          id: true,
          title: true,
          publish: true,
          logo: true,
          text: true,
          tournament: { select: { id: true } },
        },
      }),
      this.prisma.tournament.findMany({ select: { id: true, name: true } }),
    ])
    const news: TNews = {
      id: db_news.id,
      title: db_news.title,
      publish: db_news.publish,
      logo: db_news.logo,
      text: db_news.text,
      tournament_id: db_news.tournament ? db_news.tournament.id : null,
    }
    return { news, tournaments }
  }
  uploadLogo = async (id: string, req: IncomingMessage): Promise<string> => {
    const filename = await uploadToS3(req)
    const logo = await this.prisma.news
      .update({
        where: { id },
        data: { logo: filename },
        select: { logo: true },
      })
      .then((r) => r.logo || "")
    return logo
  }
  deleteLogo = async (id: string) => {
    await this.prisma.news.update({
      where: { id },
      data: { logo: null },
    })
  }
  deleteNews = async (id: string): Promise<TNewsList[]> => {
    await this.prisma.news.delete({ where: { id } })
    const news_list = await this.prisma.news.findMany({
      select: { id: true, title: true, publish: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return news_list
  }
  webList = async (): Promise<TWebNewsList[]> => {
    const news_list = await this.prisma.news.findMany({
      where: { publish: true },
      select: { id: true, title: true, publish: true, logo: true, text: true },
      orderBy: { created_at: "asc" },
    })
    return news_list
  }
  webGetNews = async (id: string): Promise<TNews> => {
    const db_news = await this.prisma.news.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        publish: true,
        logo: true,
        text: true,
        tournament: { select: { id: true } },
      },
    })
    if (!db_news) {
      throw new Error("Unknown news")
    }
    const news: TNews = {
      id: db_news.id,
      title: db_news.title,
      publish: db_news.publish,
      logo: db_news.logo,
      text: db_news.text,
      tournament_id: db_news.tournament ? db_news.tournament.id : null,
    }
    return news
  }
}
