import { Inject, Injectable } from "@nestjs/common"
import { IncomingMessage } from "http"
import { NewsRepository } from "../data"
import { uploadToS3 } from "../utils"
import { TNewsCreateInput, TNewsListInput, TNewsUpdateInput } from "./inputs"
import { TNewsListOutput, TNewsOutput } from "./outputs"

@Injectable()
export class NewsService {
  constructor(@Inject(NewsRepository) private readonly repository: NewsRepository) {}

  public async findMany(input?: TNewsListInput): Promise<TNewsListOutput> {
    return this.repository.findMany(input)
  }

  public async getOne(id: string): Promise<TNewsOutput> {
    return this.repository.getOne(id)
  }

  public async createOne(input: TNewsCreateInput): Promise<string> {
    return this.repository.createOne(input)
  }

  public async updateOne(input: TNewsUpdateInput): Promise<void> {
    return this.repository.updateOne(input)
  }

  public async deleteOne(id: string): Promise<void> {
    return this.repository.deleteOne(id)
  }

  public async uploadLogo(id: string, req: IncomingMessage): Promise<string> {
    const logo = await uploadToS3(req)
    await this.repository.updateOne({ id, logo })
    return logo
  }

  public async deleteLogo(id: string): Promise<void> {
    return this.repository.updateOne({ id, logo: null })
  }
}
