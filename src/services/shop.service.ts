import { Inject, Injectable } from "@nestjs/common"
import { IncomingMessage } from "http"
import { ShopRepository } from "../data"
import { uploadToS3 } from "../utils"
import { TShopCreateInput, TShopUpdateInput } from "./inputs"
import { TMediaOutput, TShopListOutput, TShopOutput } from "./outputs"

@Injectable()
export class ShopService {
  constructor(@Inject(ShopRepository) private readonly shopRepository: ShopRepository) {}

  public async findMany(): Promise<TShopListOutput> {
    return this.shopRepository.findMany()
  }

  public async getOne(id: string): Promise<TShopOutput> {
    return this.shopRepository.getOne(id)
  }

  public async createOne(input: TShopCreateInput): Promise<string> {
    return this.shopRepository.createOne(input)
  }

  public async updateOne(input: TShopUpdateInput): Promise<void> {
    return this.shopRepository.updateOne(input)
  }

  public async deleteOne(id: string): Promise<void> {
    return this.shopRepository.deleteOne(id)
  }

  public async uploadLogo(id: string, req: IncomingMessage): Promise<string> {
    const logo = await uploadToS3(req)
    await this.shopRepository.updateOne({ id, logo })
    return logo
  }

  public async deleteLogo(id: string): Promise<void> {
    await this.shopRepository.updateOne({ id, logo: null })
  }

  public async uploadImage(id: string, req: IncomingMessage): Promise<TMediaOutput> {
    const url = await uploadToS3(req)
    console.log(url)
    return this.shopRepository.createImage({ id, url })
  }

  public async deleteImage(image_id: string): Promise<void> {
    return this.shopRepository.deleteImage(image_id)
  }
}
