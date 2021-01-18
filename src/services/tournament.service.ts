import { Inject, Injectable } from "@nestjs/common"
import { IncomingMessage } from "http"
import { TournamentRepository } from "../data"
import { uploadToS3 } from "../utils"
import { TTournamentCreateInput, TTournamentUpdateInput, TVideoCreateInput } from "./inputs"
import { TMediaOutput, TTournamentListOutput, TTournamentOutput } from "./outputs"

@Injectable()
export class TournamentService {
  constructor(@Inject(TournamentRepository) private readonly repository: TournamentRepository) {}

  public async findMany(): Promise<TTournamentListOutput> {
    return this.repository.findMany()
  }

  public async getOne(id: string): Promise<TTournamentOutput> {
    return this.repository.getOne(id)
  }

  public async createOne(input: TTournamentCreateInput): Promise<string> {
    return this.repository.createOne(input)
  }

  public async updateOne(input: TTournamentUpdateInput): Promise<void> {
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

  public async uploadOneImage(id: string, req: IncomingMessage): Promise<TMediaOutput> {
    const url = await uploadToS3(req)
    return this.repository.createOneImage({ id, url })
  }

  public async deleteOneImage(image_id: string): Promise<void> {
    return this.repository.deleteOneImage(image_id)
  }

  public async createOneVideo(input: TVideoCreateInput): Promise<TMediaOutput> {
    return this.repository.createOneVideo(input)
  }

  public async deleteOneVideo(video_id: string): Promise<void> {
    return this.repository.deleteOneVideo(video_id)
  }
}
