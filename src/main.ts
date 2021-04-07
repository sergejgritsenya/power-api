require("dotenv").config()
import { Logger } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import cors from "cors"
import { config } from "./config"
import { AppModule } from "./modules"

const bootstrap = async () => {
  new Logger().log(`App config: ${JSON.stringify(config)}`)
  const app = await NestFactory.create(AppModule)
  app.use(cors())
  // app.use(collectorMiddleware)
  await app.listen(config.PORT, () => Logger.log(`Server start on: http://localhost:${config.PORT}`))
}
bootstrap()
