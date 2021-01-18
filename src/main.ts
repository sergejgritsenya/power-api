require("dotenv").config()
import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import cors from "cors"
import { AppModule } from "./modules"

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  app.use(cors())
  await app.listen(3088, () => Logger.log("Server start on: http://localhost:3088"))
}
bootstrap()
