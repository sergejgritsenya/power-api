export enum EAuthKey {
  admin = "power-auth-token-admin",
}
export enum EAuthStorageKey {
  admin = "power-token-admin",
  admin_refresh = "power-token-admin-refresh",
}

export type TAuth = {
  access_token: string
  refresh_token: string
}
export type TAuthProps = {
  login: string
  password: string
}
