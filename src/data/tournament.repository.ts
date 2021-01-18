import { Inject, Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { TCreateMediaDto, TTournamentCreateDto, TTournamentUpdateDto } from "./dto"
import { TMediaModel, TTournamentListModel, TTournamentModel } from "./models"
import { PrismaEntity } from "./prisma.entity"

@Injectable()
export class TournamentRepository {
  private readonly prisma: PrismaClient
  constructor(@Inject(PrismaEntity) private readonly entity: PrismaEntity) {
    this.prisma = this.entity.prisma
  }

  public async findMany(): Promise<TTournamentListModel> {
    return this.prisma.tournament.findMany({
      select: { id: true, logo: true, name: true },
      orderBy: { created_at: "asc" },
    })
  }

  public async getOne(id: string): Promise<TTournamentModel> {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        videos: { select: { id: true, url: true } },
        images: { select: { id: true, url: true } },
      },
    })

    if (!tournament) {
      throw new Error("Unknown tournament")
    }

    return tournament
  }

  public async createOne(data: TTournamentCreateDto): Promise<string> {
    const { id } = await this.prisma.tournament.create({ data })
    return id
  }

  public async updateOne(input: TTournamentUpdateDto): Promise<void> {
    const { id, ...data } = input
    await this.prisma.tournament.update({
      where: { id },
      data,
    })
  }

  public async deleteOne(id: string): Promise<void> {
    await this.prisma.tournamentImage.deleteMany({ where: { tournament: { id } } })
    await this.prisma.tournamentVideo.deleteMany({ where: { tournament: { id } } })
    await this.prisma.tournament.delete({ where: { id } })
  }

  public async createOneImage(input: TCreateMediaDto): Promise<TMediaModel> {
    const { id, url } = input
    return this.prisma.tournamentImage.create({
      data: { url, tournament: { connect: { id } } },
      select: { id: true, url: true },
    })
  }

  public async deleteOneImage(id: string): Promise<void> {
    await this.prisma.tournamentImage.delete({ where: { id } })
  }

  public async createOneVideo(input: TCreateMediaDto): Promise<TMediaModel> {
    const { id, url } = input
    return this.prisma.tournamentVideo.create({
      data: { url, tournament: { connect: { id } } },
      select: { id: true, url: true },
    })
  }

  public async deleteOneVideo(id: string): Promise<void> {
    await this.prisma.tournamentVideo.delete({ where: { id } })
  }
}
