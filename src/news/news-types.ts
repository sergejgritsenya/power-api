export type TNewsList = {
  id: string
  title: string
  publish: boolean
  logo: string | null
}
export type TWebNewsList = {
  id: string
  title: string
  publish: boolean
  logo: string | null
  text: string
}
export type TNews = {
  id: string
  title: string
  logo: string | null
  publish: boolean
  text: string
  tournament_id: string | null
}
export type TNewsCreateProps = {
  title: string
  text: string
}
export type TNewsUpdateProps = {
  title: string
  publish: boolean
  text: string
  tournament_id?: string
}
export type TNewsTournaments = {
  id: string
  name: string
}
export type TNewsAdmin = {
  news: TNews
  tournaments: TNewsTournaments[]
}
