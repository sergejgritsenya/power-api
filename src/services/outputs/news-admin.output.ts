import { TNewsOutput } from "./news.output"

type TNewsTournaments = {
  id: string
  name: string
}

export type TNewsAdminOutput = {
  news: TNewsOutput
  tournaments: TNewsTournaments[]
}
