import { PrismaClient } from "@prisma/client"
import { IncomingMessage } from "http"
import { inject, injectable } from "inversify"
import { PrismaService } from "../server/prisma-service"
import { uploadToS3 } from "../upload-file"
import {
  TTournament,
  TTournamentImage,
  TTournamentList,
  TTournamentUpdateProps,
  TTournamentVideo,
  TTournamentVideoCreateProps,
} from "./tournament-types"

@injectable()
export class TournamentService {
  prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  list = async (): Promise<TTournamentList[]> => {
    const tournaments = await this.prisma.tournament.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return tournaments
  }
  getTournament = async (id: string): Promise<TTournament> => {
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
  create = async (data: TTournamentUpdateProps): Promise<string> => {
    const tournament = await this.prisma.tournament.create({ data })
    return tournament.id
  }
  update = async (id: string, data: TTournamentUpdateProps): Promise<TTournament> => {
    const tournament = await this.prisma.tournament.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        logo: true,
        videos: { select: { id: true, url: true } },
        images: { select: { id: true, url: true } },
      },
    })
    return tournament
  }
  deleteTournament = async (id: string): Promise<TTournamentList[]> => {
    await this.prisma.tournamentImage.deleteMany({ where: { tournament: { id } } })
    await this.prisma.tournamentVideo.deleteMany({ where: { tournament: { id } } })
    await this.prisma.tournament.delete({ where: { id } })
    const tournaments = await this.prisma.tournament.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return tournaments
  }
  uploadLogo = async (id: string, req: IncomingMessage): Promise<string> => {
    const filename = await uploadToS3(req)
    const logo = await this.prisma.tournament
      .update({
        where: { id },
        data: { logo: filename },
        select: { logo: true },
      })
      .then((r) => r.logo || "")
    return logo
  }
  deleteLogo = async (id: string) => {
    await this.prisma.tournament.update({
      where: { id },
      data: { logo: null },
    })
  }
  uploadImage = async (
    tournament_id: string,
    req: IncomingMessage
  ): Promise<TTournamentImage[]> => {
    console.log("!!!!!!!!!!!!!!!!!!!!!")
    const url = await uploadToS3(req)
    await this.prisma.tournamentImage.create({
      data: { url, tournament: { connect: { id: tournament_id } } },
    })
    const images = this.prisma.tournamentImage.findMany({
      where: { tournament: { id: tournament_id } },
      select: { id: true, url: true },
    })
    return images
  }
  deleteImage = async (tournament_id: string, id: string): Promise<TTournamentImage[]> => {
    await this.prisma.tournamentImage.delete({ where: { id } })
    const images = this.prisma.tournamentImage.findMany({
      where: { tournament: { id: tournament_id } },
      select: { id: true, url: true },
    })
    return images
  }
  createVideo = async (
    tournament_id: string,
    data: TTournamentVideoCreateProps
  ): Promise<TTournamentVideo[]> => {
    await this.prisma.tournamentVideo.create({
      data: { ...data, tournament: { connect: { id: tournament_id } } },
    })
    const videos = this.prisma.tournamentVideo.findMany({
      where: { tournament: { id: tournament_id } },
      select: { id: true, url: true },
    })
    return videos
  }
  deleteVideo = async (tournament_id: string, id: string): Promise<TTournamentVideo[]> => {
    await this.prisma.tournamentVideo.delete({ where: { id } })
    const videos = this.prisma.tournamentVideo.findMany({
      where: { tournament: { id: tournament_id } },
      select: { id: true, url: true },
    })
    return videos
  }
}
