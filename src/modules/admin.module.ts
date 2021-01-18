import { Module } from "@nestjs/common"
import * as controllers from "../controllers/admin"
import * as dao from "../data"
import * as services from "../services"

@Module({
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services), ...Object.values(dao)],
})
export class AdminModule {}
