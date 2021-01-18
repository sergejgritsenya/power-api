import { TMediaOutput } from "./media.output"

export type TTournamentOutput = {
  id: string
  name: string
  logo: string | null
  description: string
  videos: TMediaOutput[]
  images: TMediaOutput[]
}
