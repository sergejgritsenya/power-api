import { Inject, Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { TNewsCreateDto, TNewsListDto, TNewsUpdateDto } from "./dto"
import { TNewsListModel, TNewsModel } from "./models"
import { PrismaEntity } from "./prisma.entity"

@Injectable()
export class NewsRepository {
  private readonly prisma: PrismaClient
  constructor(@Inject(PrismaEntity) private readonly entity: PrismaEntity) {
    this.prisma = this.entity.prisma
  }

  public async findMany(input: TNewsListDto = {}): Promise<TNewsListModel> {
    return this.prisma.news.findMany({
      where: input,
      select: { id: true, logo: true, publish: true, title: true },
      orderBy: { created_at: "asc" },
    })
  }

  public async getOne(id: string): Promise<TNewsModel> {
    const news = await this.prisma.news.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        publish: true,
        logo: true,
        text: true,
        tournament_id: true,
      },
    })
    if (!news) {
      throw new Error("Unknown news")
    }

    return news
  }

  public async createOne(data: TNewsCreateDto): Promise<string> {
    const { id } = await this.prisma.news.create({ data })
    return id
  }

  public async updateOne(input: TNewsUpdateDto): Promise<void> {
    const { id, tournament_id, ...data } = input

    await this.prisma.news.update({
      where: { id },
      data: {
        ...data,
        tournament: tournament_id ? { connect: { id: tournament_id } } : { disconnect: true },
      },
    })
  }

  public async deleteOne(id: string): Promise<void> {
    await this.prisma.news.delete({ where: { id } })
  }
}
