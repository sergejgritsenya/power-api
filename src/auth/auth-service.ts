import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"
import { inject, injectable } from "inversify"
import { verify } from "jsonwebtoken"
import { api_env } from "../server/env"
import { PrismaService } from "../server/prisma-service"
import { generateTokens } from "../utils"
import { TAuth, TAuthProps } from "./auth-types"

@injectable()
export class AuthService {
  prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  adminLogin = async (props: TAuthProps): Promise<TAuth> => {
    try {
      const admin = await this.prisma.admin.findOne({
        where: { login: props.login },
        select: { id: true },
      })
      if (!admin) {
        throw new Error("admin not found")
      }
      const password = await this.prisma.admin
        .findOne({ where: { login: props.login } })
        .password({ select: { password: true } })
      if (!password) {
        throw new Error("password not found")
      }
      const pass_valid = await compare(props.password, password.password)
      const { access_token, refresh_token } = generateTokens(admin.id)
      if (!pass_valid) {
        throw new Error("pair doesn't match")
      }
      return { access_token, refresh_token }
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  adminRefresh = async (token: string): Promise<TAuth> => {
    try {
      const JWT_SECRET_ADMIN_REFRESH = api_env.JWT_SECRET_ADMIN_REFRESH
      const admin_payload =
        token && (verify(token, JWT_SECRET_ADMIN_REFRESH) as { admin_id: string })
      const admin_id = admin_payload ? admin_payload.admin_id : undefined
      if (!admin_id) {
        throw new Error("admin not found")
      }
      const admin = await this.prisma.admin.findOne({
        where: { id: admin_id },
        select: { id: true },
      })
      if (!admin) {
        throw new Error("admin not found")
      }
      const { access_token, refresh_token } = generateTokens(admin_id)
      return { access_token, refresh_token }
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
