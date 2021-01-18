import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Request } from "express"
import { verify } from "jsonwebtoken"
import { config } from "../../config"
import { HasAuthAdmin, TAuthAdmin } from "../types"

const X_AUTH_ADMIN_TOKEN = "X-AUTH-POWER-ADMIN"
const JWT_SECRET_ADMIN = config.JWT_SECRET_ADMIN

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & HasAuthAdmin>()
    const token = req.header(X_AUTH_ADMIN_TOKEN)
    if (!token) {
      throw new UnauthorizedException()
    }
    const { admin_id, is_super } = verify(token, JWT_SECRET_ADMIN) as TAuthAdmin

    req.admin = { admin_id, is_super }

    return true
  }
}
