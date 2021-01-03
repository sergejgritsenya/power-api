export type TShopList = {
  id: string
  name: string
  logo: string | null
}
export type TShop = {
  id: string
  name: string
  price: string
  description: string
  logo: string | null
  images: TShopImage[]
}

export type TShopUpdateProps = {
  name: string
  price: string
  description: string
}

export type TShopImage = {
  id: string
  url: string
}
