export type TTournamentList = {
  id: string
  name: string
  logo: string | null
}
export type TTournament = {
  id: string
  name: string
  logo: string | null
  description: string
  videos: TTournamentVideo[]
  images: TTournamentImage[]
}
export type TTournamentUpdateProps = {
  name: string
  description: string
}
export type TTournamentVideo = {
  id: string
  url: string
}
export type TTournamentVideoCreateProps = {
  url: string
}
export type TTournamentImage = {
  id: string
  url: string
}
