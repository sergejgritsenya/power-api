import { sign } from "jsonwebtoken"
import { config } from "../config"

const { JWT_SECRET_ADMIN, JWT_SECRET_ADMIN_REFRESH } = config

const ACCESS_TOKEN_EXP_IN_SEC = 24 * 60 * 60
const REFRESH_TOKEN_EXP_IN_SEC = 2 * 24 * 60 * 60

type TAuthInput = {
  admin_id: string
  is_super: boolean
}

type TAuthOutput = {
  access_token: string
  refresh_token: string
}

export const generateTokens = (input: TAuthInput): TAuthOutput => ({
  access_token: sign(input, JWT_SECRET_ADMIN, {
    expiresIn: ACCESS_TOKEN_EXP_IN_SEC,
  }),
  refresh_token: sign(input, JWT_SECRET_ADMIN_REFRESH, {
    expiresIn: REFRESH_TOKEN_EXP_IN_SEC,
  }),
})
