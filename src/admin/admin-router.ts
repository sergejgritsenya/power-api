import { inject, injectable } from "inversify"
import { admin_routes } from "../common"
import { ApiAuthRouter } from "../server/context"
import { AdminService } from "./admin-service"
import { TAdminChangePasswordProps, TAdminCreateProps, TAdminUpdateProps } from "./admin-types"

@injectable()
export class AdminRouter {
  admin_router = new ApiAuthRouter()
  constructor(@inject(AdminService) private readonly adminService: AdminService) {
    this.admin_router.get(admin_routes.root, async (ctx) => {
      ctx.body = await this.adminService.list()
    })
    this.admin_router.get(admin_routes.admin_me, async (ctx) => {
      try {
        const admin_id = ctx.admin_id
        if (admin_id) {
          ctx.body = await this.adminService.getAdmin(admin_id)
        } else {
          ctx.status = 401
        }
      } catch (e) {
        ctx.status = 401
      }
    })
    this.admin_router.get(admin_routes.get, async (ctx) => {
      const { admin_id } = ctx.params
      ctx.body = await this.adminService.getAdmin(admin_id)
    })
    this.admin_router.post(admin_routes.root, async (ctx) => {
      const data = ctx.request.body as TAdminCreateProps
      const super_id = ctx.admin_id
      if (super_id) {
        try {
          ctx.body = await this.adminService.create(data, super_id)
        } catch (e) {
          ctx.body = e
          ctx.status = 403
        }
      } else {
        ctx.status = 401
      }
    })
    this.admin_router.put(admin_routes.root, async (ctx) => {
      const admin_id = ctx.admin_id
      if (admin_id) {
        const data = ctx.request.body as TAdminUpdateProps
        ctx.body = await this.adminService.update(admin_id, data)
      } else {
        ctx.status = 401
      }
    })
    this.admin_router.patch(admin_routes.change_pass, async (ctx) => {
      const admin_id = ctx.admin_id
      if (admin_id) {
        const data = ctx.request.body as TAdminChangePasswordProps
        await this.adminService.changePassword(admin_id, data)
        ctx.status = 200
      } else {
        ctx.status = 401
      }
    })
    this.admin_router.delete(admin_routes.get, async (ctx) => {
      const { admin_id } = ctx.params
      const super_id = ctx.admin_id
      if (super_id) {
        try {
          ctx.body = await this.adminService.deleteAdmin(admin_id, super_id)
        } catch (e) {
          ctx.body = e
          ctx.status = 403
        }
      } else {
        ctx.status = 401
      }
    })
  }
}
