import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Request } from "express"
import { HasAuthAdmin } from "../types"

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & HasAuthAdmin>()
    if (!req.admin) {
      return false
    }

    return req.admin.is_super
  }
}
