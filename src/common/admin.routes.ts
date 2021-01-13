export const control_routes = {
  control: "/control",
}

const root_routes = {
  auth: `${control_routes.control}/auth`,
  admin: `${control_routes.control}/admin`,
  tournament: `${control_routes.control}/tournament`,
  news: `${control_routes.control}/news`,
  shop: `${control_routes.control}/shop`,
}

export const news_routes = {
  root: root_routes.news,
  get: `${root_routes.news}/:news_id`,
  upload: `${root_routes.news}/upload/:news_id`,
  deleteLogo: `${root_routes.news}/deleteLogo/:news_id`,
}

export const tournament_routes = {
  root: root_routes.tournament,
  get: `${root_routes.tournament}/:tournament_id`,
  upload: `${root_routes.tournament}/upload/:tournament_id`,
  deleteLogo: `${root_routes.tournament}/deleteLogo/:tournament_id`,
  video: `${root_routes.tournament}/video/:tournament_id`,
  deleteVideo: `${root_routes.tournament}/video/:tournament_id/:video_id`,
  image: `${root_routes.tournament}/image/:tournament_id`,
  deleteImage: `${root_routes.tournament}/image/:tournament_id/:image_id`,
}
