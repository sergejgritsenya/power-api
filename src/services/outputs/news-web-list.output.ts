export type TWebNewsItem = {
  id: string
  title: string
  publish: boolean
  logo: string | null
  text: string
}

export type TWebNewsListOutput = TWebNewsItem[]
