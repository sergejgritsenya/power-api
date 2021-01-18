import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { AdminService } from "../../services"
import { AuthAdmin } from "../decorators"
import { AuthGuard, RoleGuard } from "../guards"
import { AdminChangePassword, AdminCreateRequest, AdminUpdateRequest } from "./requests"

@UseGuards(AuthGuard)
@Controller("control/admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  public async findMany() {
    return this.adminService.findMany()
  }

  @Get("admin_me")
  public async adminMe(@AuthAdmin() admin_id: string) {
    return this.adminService.getOne(admin_id)
  }

  @Get(":admin_id")
  public async getOne(@Param("admin_id") admin_id: string) {
    return this.adminService.getOne(admin_id)
  }

  @Post()
  @UseGuards(RoleGuard)
  public async createOne(@Body() request: AdminCreateRequest): Promise<string> {
    return this.adminService.createOne(request)
  }

  @Patch()
  public async updateOne(
    @AuthAdmin() id: string,
    @Body() request: AdminUpdateRequest
  ): Promise<void> {
    return this.adminService.updateOne({ id, ...request })
  }

  @Patch("change_pass")
  public async changePassword(
    @AuthAdmin() admin_id: string,
    @Body() request: AdminChangePassword
  ): Promise<void> {
    return this.adminService.changePassword({ admin_id, ...request })
  }

  @Delete(":admin_id")
  @UseGuards(RoleGuard)
  public async deleteOne(@Param("admin_id") admin_id: string): Promise<void> {
    return this.adminService.deleteOne(admin_id)
  }
}
