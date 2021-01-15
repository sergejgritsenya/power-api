export const control_routes = {
  control: "/control",
}

const root_routes = {
  admin: `${control_routes.control}/admin`,
  auth: `${control_routes.control}/auth`,
  news: `${control_routes.control}/news`,
  shop: `${control_routes.control}/shop`,
  tournament: `${control_routes.control}/tournament`,
}

export const admin_routes = {
  root: root_routes.admin,
  change_pass: `${root_routes.admin}/change_pass`,
  admin_me: `${root_routes.admin}/admin_me`,
  get: `${root_routes.admin}/:admin_id`,
}

export const auth_routes = {
  login: `${root_routes.auth}/login`,
  refresh: `${root_routes.auth}/refresh`,
}

export const news_routes = {
  root: root_routes.news,
  get: `${root_routes.news}/:news_id`,
  upload: `${root_routes.news}/upload/:news_id`,
  deleteLogo: `${root_routes.news}/deleteLogo/:news_id`,
}

export const shop_routes = {
  root: root_routes.shop,
  get: `${root_routes.shop}/:shop_id`,
  upload: `${root_routes.shop}/upload/:shop_id`,
  deleteLogo: `${root_routes.shop}/deleteLogo/:shop_id`,
  image: `${root_routes.shop}/image/:shop_id`,
  deleteImage: `${root_routes.shop}/image/:shop_id/:image_id`,
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
