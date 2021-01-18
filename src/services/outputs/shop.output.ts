import { TMediaOutput } from "./media.output"

export type TShopOutput = {
  id: string
  name: string
  price: string
  description: string
  logo: string | null
  images: TMediaOutput[]
}
