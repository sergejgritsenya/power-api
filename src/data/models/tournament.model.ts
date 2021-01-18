import { TMediaModel } from "./media.model"

export type TTournamentModel = {
  id: string
  description: string
  logo: string | null
  name: string
  images: TMediaModel[]
  videos: TMediaModel[]
}
