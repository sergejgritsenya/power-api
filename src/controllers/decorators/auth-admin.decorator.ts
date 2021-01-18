import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Request } from "express"
import { HasAuthAdmin } from "../types"

export const AuthAdmin = createParamDecorator((_: unknown, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest<Request & HasAuthAdmin>()
  if (!req.admin) {
    throw new Error("Cannot get admin from Request.")
  }

  return req.admin.admin_id
})
