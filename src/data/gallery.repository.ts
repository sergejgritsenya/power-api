import { Inject, Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { TGalleryCreateDto, TGalleryUpdateDto } from "./dto"
import { TGalleryListModel, TGalleryModel } from "./models"
import { PrismaEntity } from "./prisma.entity"

@Injectable()
export class GalleryRepository {
  private readonly prisma: PrismaClient
  constructor(@Inject(PrismaEntity) private readonly entity: PrismaEntity) {
    this.prisma = this.entity.prisma
  }

  public async findMany(): Promise<TGalleryListModel> {
    return this.prisma.gallery.findMany({
      select: { id: true, url: true },
      orderBy: { created_at: "asc" },
    })
  }

  public async getOne(id: string): Promise<TGalleryModel> {
    const gallery = await this.prisma.gallery.findUnique({
      where: { id },
      select: {
        id: true,
        url: true,
      },
    })
    if (!gallery) {
      throw new Error("Unknown gallery")
    }

    return gallery
  }

  public async createOne(data: TGalleryCreateDto): Promise<string> {
    const { id } = await this.prisma.gallery.create({ data })
    return id
  }

  public async updateOne(input: TGalleryUpdateDto): Promise<void> {
    const { id, ...data } = input

    await this.prisma.gallery.update({
      where: { id },
      data: {
        ...data,
      },
    })
  }

  public async deleteOne(id: string): Promise<void> {
    await this.prisma.gallery.delete({ where: { id } })
  }
}
