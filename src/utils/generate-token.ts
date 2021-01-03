import { sign } from "jsonwebtoken"
import { api_env } from "../server/env"

const JWT_SECRET_ADMIN = api_env.JWT_SECRET_ADMIN
const JWT_SECRET_ADMIN_REFRESH = api_env.JWT_SECRET_ADMIN_REFRESH

const ACCESS_TOKEN_EXP_IN_SEC = 24 * 60 * 60
const REFRESH_TOKEN_EXP_IN_SEC = 2 * 24 * 60 * 60

export const generateTokens = (id: string) => {
  return {
    access_token: sign({ admin_id: id }, JWT_SECRET_ADMIN, { expiresIn: ACCESS_TOKEN_EXP_IN_SEC }),
    refresh_token: sign({ admin_id: id }, JWT_SECRET_ADMIN_REFRESH, {
      expiresIn: REFRESH_TOKEN_EXP_IN_SEC,
    }),
  }
}
