const app_routes = {
  control: "/control",
}
const control_routes = {
  auth: `${app_routes.control}/auth`,
  admin: `${app_routes.control}/admin`,
  tournament: `${app_routes.control}/tournament`,
  news: `${app_routes.control}/news`,
  shop: `${app_routes.control}/shop`,
}
export const admin_auth_routes = {
  login: `${control_routes.auth}/login`,
  refresh: `${control_routes.auth}/refresh`,
}
export const admin_root_routes = {
  list: `${control_routes.admin}/list`,
  create: `${control_routes.admin}/create`,
  update: `${control_routes.admin}/update`,
  change_pass: `${control_routes.admin}/change_pass`,
  delete: `${control_routes.admin}/delete`,
  admin_me: `${control_routes.admin}/admin_me`,
  root: `${control_routes.admin}/:admin_id`,
}
export const admin_routes = {
  get: `${admin_root_routes.root}/get`,
  logout: `${admin_root_routes.root}/logout`,
}
export const tournament_root_routes = {
  list: `${control_routes.tournament}/list`,
  create: `${control_routes.tournament}/create`,
  delete: `${control_routes.tournament}/delete`,
  root: `${control_routes.tournament}/:tournament_id`,
}
export const tournament_routes = {
  get: `${tournament_root_routes.root}/get`,
  upload: `${tournament_root_routes.root}/upload`,
  deleteLogo: `${tournament_root_routes.root}/deleteLogo`,
  update: `${tournament_root_routes.root}/update`,
  video: `${tournament_root_routes.root}/video`,
  image: `${tournament_root_routes.root}/image`,
}
export const tournament_video_routes = {
  create: `${tournament_routes.video}/create`,
  delete: `${tournament_routes.video}/delete`,
}
export const tournament_image_routes = {
  upload: `${tournament_routes.image}/upload`,
  delete: `${tournament_routes.image}/delete`,
}
export const news_root_routes = {
  list: `${control_routes.news}/list`,
  create: `${control_routes.news}/create`,
  delete: `${control_routes.news}/delete`,
  root: `${control_routes.news}/:news_id`,
}
export const news_routes = {
  get: `${news_root_routes.root}/get`,
  upload: `${news_root_routes.root}/upload`,
  deleteLogo: `${news_root_routes.root}/deleteLogo`,
  update: `${news_root_routes.root}/update`,
}
export const shop_root_routes = {
  list: `${control_routes.shop}/list`,
  create: `${control_routes.shop}/create`,
  delete: `${control_routes.shop}/delete`,
  root: `${control_routes.shop}/:shop_id`,
}
export const shop_routes = {
  get: `${shop_root_routes.root}/get`,
  upload: `${shop_root_routes.root}/upload`,
  deleteLogo: `${shop_root_routes.root}/deleteLogo`,
  update: `${shop_root_routes.root}/update`,
  image: `${shop_root_routes.root}/image`,
}
export const shop_image_routes = {
  upload: `${shop_routes.image}/upload`,
  delete: `${shop_routes.image}/delete`,
}

export const frontRoute = (route: string, args: Record<string, any>): string => {
  const arr = route.split("/")
  const res_arr = arr.map((chunk) => {
    if (chunk.startsWith(":")) {
      return args[chunk.slice(1)]
    }
    return chunk
  })
  return res_arr.join("/")
}
