import Koa  from "koa"
import bodyParser from "koa-bodyparser"
import { ApiDiService, TInitServerProps } from "./di"
import { TEnv } from "./env"
import { cors, errorMiddleware, koaOnError } from "./middleware"
import { appSymbols } from "./symbols"

const init = (props: TInitServerProps) => {
  const app = new Koa()
  app.context.ioc = props.container
  app.use(errorMiddleware)
  app.use(cors)
  app.use(bodyParser())
  app.on("error", koaOnError)
  app.use(props.router.routes()).use(props.router.allowedMethods())
  const env: TEnv = props.container.get(appSymbols.env)
  const api_port = env.PORT
  app.listen(api_port, () => console.log(`API server start on: http://localhost:${api_port}`))
}

const di = new ApiDiService()
di.init().then(init)
