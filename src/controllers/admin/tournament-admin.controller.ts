import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common"
import { Request } from "express"
import { TournamentService } from "../../services"
import { AuthGuard } from "../guards"
import {
  TournamentCreateRequest,
  TournamentUpdateRequest,
  VideoCreateRequest,
} from "./requests"

@UseGuards(AuthGuard)
@Controller("control/tournament")
export class TournamentAdminController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Get()
  public async findMany() {
    return this.tournamentService.findMany()
  }

  @Get(":tournament_id")
  public async getOne(@Param("tournament_id") tournament_id: string) {
    return this.tournamentService.getOne(tournament_id)
  }

  @Post()
  public async createOne(@Body() request: TournamentCreateRequest) {
    return this.tournamentService.createOne(request)
  }

  @Patch(":tournament_id")
  public async updateOne(
    @Body() request: TournamentUpdateRequest,
    @Param("tournament_id") id: string
  ) {
    return this.tournamentService.updateOne({ id, ...request })
  }

  @Delete(":tournament_id")
  public async deleteOne(@Param("tournament_id") tournament_id: string) {
    return this.tournamentService.deleteOne(tournament_id)
  }

  @Put("upload/:tournament_id")
  public async uploadLogo(
    @Param("tournament_id") tournament_id: string,
    @Req() req: Request
  ) {
    return this.tournamentService.uploadLogo(tournament_id, req)
  }

  @Delete("deleteLogo/:tournament_id")
  public async deleteLogo(@Param("tournament_id") tournament_id: string) {
    return this.tournamentService.deleteLogo(tournament_id)
  }

  @Put("image/:tournament_id")
  public async uploadImage(
    @Param("tournament_id") tournament_id: string,
    @Req() req: Request
  ) {
    return this.tournamentService.uploadOneImage(tournament_id, req)
  }

  @Delete("image/:image_id")
  public async deleteImage(@Param("image_id") image_id: string) {
    return this.tournamentService.deleteOneImage(image_id)
  }

  @Put("video/:tournament_id")
  public async createOneVideo(
    @Body() request: VideoCreateRequest,
    @Param("tournament_id") id: string
  ) {
    return this.tournamentService.createOneVideo({ id, ...request })
  }

  @Delete("video/:video_id")
  public async deleteOneVideo(@Param("video_id") video_id: string) {
    return this.tournamentService.deleteOneVideo(video_id)
  }
}
