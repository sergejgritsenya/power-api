import { inject, injectable } from "inversify"
import { admin_root_routes, admin_routes } from "../common/routes"
import { ApiAuthRouter } from "../server/context"
import { AdminService } from "./admin-service"
import { TAdminChangePasswordProps, TAdminCreateProps, TAdminUpdateProps } from "./admin-types"

@injectable()
export class AdminRouter {
  admin_router = new ApiAuthRouter()
  constructor(@inject(AdminService) private readonly adminService: AdminService) {
    this.admin_router.post(admin_root_routes.list, async (ctx) => {
      ctx.body = await this.adminService.list()
    })
    this.admin_router.post(admin_root_routes.create, async (ctx) => {
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
    this.admin_router.post(admin_root_routes.update, async (ctx) => {
      const admin_id = ctx.admin_id
      if (admin_id) {
        const data = ctx.request.body as TAdminUpdateProps
        ctx.body = await this.adminService.update(admin_id, data)
      } else {
        ctx.status = 401
      }
    })
    this.admin_router.post(admin_root_routes.change_pass, async (ctx) => {
      const admin_id = ctx.admin_id
      if (admin_id) {
        const data = ctx.request.body as TAdminChangePasswordProps
        await this.adminService.changePassword(admin_id, data)
        ctx.status = 200
      } else {
        ctx.status = 401
      }
    })
    this.admin_router.post(admin_root_routes.delete, async (ctx) => {
      const { admin_id } = ctx.request.body as { admin_id: string }
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
    this.admin_router.post(admin_routes.get, async (ctx) => {
      const admin_id = ctx.params.admin_id
      ctx.body = await this.adminService.getAdmin(admin_id)
    })
    this.admin_router.post(admin_root_routes.admin_me, async (ctx) => {
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
  }
}
