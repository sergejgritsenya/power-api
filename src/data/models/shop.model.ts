import { TMediaModel } from "./media.model"

export type TShopModel = {
  id: string
  name: string
  price: string
  description: string
  logo: string | null
  images: TMediaModel[]
}
