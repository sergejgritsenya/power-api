import { Inject, Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { TCreateMediaDto, TShopCreateDto, TShopUpdateDto } from "./dto"
import { TMediaModel, TShopListModel, TShopModel } from "./models"
import { PrismaEntity } from "./prisma.entity"

@Injectable()
export class ShopRepository {
  private readonly prisma: PrismaClient
  constructor(@Inject(PrismaEntity) private readonly entity: PrismaEntity) {
    this.prisma = this.entity.prisma
  }

  public async findMany(): Promise<TShopListModel> {
    return this.prisma.shop.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { created_at: "asc" },
    })
  }

  public async getOne(id: string): Promise<TShopModel> {
    const shop = await this.prisma.shop.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        logo: true,
        images: { select: { id: true, url: true } },
      },
    })
    if (!shop) {
      throw new Error("Shop not found")
    }

    return shop
  }

  public async createOne(data: TShopCreateDto): Promise<string> {
    const { id } = await this.prisma.shop.create({ data, select: { id: true } })
    return id
  }

  public async updateOne(input: TShopUpdateDto): Promise<void> {
    const { id, ...data } = input
    await this.prisma.shop.update({
      where: { id },
      data,
    })
  }

  public async deleteOne(id: string): Promise<void> {
    await this.prisma.shopImage.deleteMany({ where: { shop: { id } } })
    await this.prisma.shop.delete({ where: { id } })
  }

  public async createImage(input: TCreateMediaDto): Promise<TMediaModel> {
    const { id, url } = input

    return this.prisma.shopImage.create({
      data: { url, shop: { connect: { id } } },
      select: { id: true, url: true },
    })
  }

  public async deleteImage(id: string): Promise<void> {
    await this.prisma.shopImage.delete({ where: { id } })
  }
}
