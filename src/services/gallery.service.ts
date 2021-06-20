import { Inject, Injectable } from "@nestjs/common"
import { IncomingMessage } from "http"
import { GalleryRepository } from "../data"
import { uploadToS3 } from "../utils"
import { TGalleryListOutput, TGalleryOutput } from "./outputs"

@Injectable()
export class GalleryService {
  constructor(@Inject(GalleryRepository) private readonly repository: GalleryRepository) {}

  public async findMany(): Promise<TGalleryListOutput> {
    return this.repository.findMany()
  }

  public async getOne(id: string): Promise<TGalleryOutput> {
    return this.repository.getOne(id)
  }

  public async createOne(req: IncomingMessage): Promise<string> {
    const url = await uploadToS3(req)
    await this.repository.createOne({ url })
    return url
  }

  public async updateOne(id: string, req: IncomingMessage): Promise<void> {
    const url = await uploadToS3(req)
    return this.repository.updateOne({ id, url })
  }

  public async deleteOne(id: string): Promise<void> {
    return this.repository.deleteOne(id)
  }
}
