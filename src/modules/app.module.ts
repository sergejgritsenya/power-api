import { Module } from "@nestjs/common"
import { AdminModule } from "./admin.module"
import { WebModule } from "./web.module"

@Module({
  imports: [AdminModule, WebModule],
})
export class AppModule {}
