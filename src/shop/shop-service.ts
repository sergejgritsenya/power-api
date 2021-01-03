import { PrismaClient } from "@prisma/client"
import { IncomingMessage } from "http"
import { inject, injectable } from "inversify"
import { PrismaService } from "../server/prisma-service"
import { uploadToS3 } from "../upload-file"
import { TShop, TShopImage, TShopList, TShopUpdateProps } from "./shop-types"

@injectable()
export class ShopService {
  prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  list = async (): Promise<TShopList[]> => {
    const shops = await this.prisma.shop.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return shops
  }
  getShop = async (id: string): Promise<TShop> => {
    const shop = await this.prisma.shop.findOne({
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
      throw new Error("Unknown shop")
    }
    return shop
  }
  create = async (data: TShopUpdateProps): Promise<string> => {
    const shop = await this.prisma.shop.create({ data })
    return shop.id
  }
  update = async (id: string, data: TShopUpdateProps): Promise<TShop> => {
    const shop = await this.prisma.shop.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        logo: true,
        images: { select: { id: true, url: true } },
      },
    })
    return shop
  }
  deleteShop = async (id: string): Promise<TShopList[]> => {
    await this.prisma.shopImage.deleteMany({ where: { shop: { id } } })
    await this.prisma.shop.delete({ where: { id } })
    const shops = await this.prisma.shop.findMany({
      select: { id: true, name: true, logo: true },
      orderBy: { created_at: "asc" },
    })
    return shops
  }
  uploadLogo = async (id: string, req: IncomingMessage): Promise<string> => {
    const filename = await uploadToS3(req)
    const logo = await this.prisma.shop
      .update({
        where: { id },
        data: { logo: filename },
        select: { logo: true },
      })
      .then((r) => r.logo || "")
    return logo
  }
  deleteLogo = async (id: string) => {
    await this.prisma.shop.update({
      where: { id },
      data: { logo: null },
    })
  }
  uploadImage = async (shop_id: string, req: IncomingMessage): Promise<TShopImage[]> => {
    const url = await uploadToS3(req)
    await this.prisma.shopImage.create({
      data: { url, shop: { connect: { id: shop_id } } },
    })
    const images = this.prisma.shopImage.findMany({
      where: { shop: { id: shop_id } },
      select: { id: true, url: true },
    })
    return images
  }
  deleteImage = async (shop_id: string, id: string): Promise<TShopImage[]> => {
    await this.prisma.shopImage.delete({ where: { id } })
    const images = this.prisma.shopImage.findMany({
      where: { shop: { id: shop_id } },
      select: { id: true, url: true },
    })
    return images
  }
}
