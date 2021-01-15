import { PrismaClient } from "@prisma/client"
import { compare, genSaltSync, hashSync } from "bcryptjs"
import { inject, injectable } from "inversify"
import { PrismaService } from "../server/prisma-service"
import {
  TAdmin,
  TAdminChangePasswordProps,
  TAdminCreateProps,
  TAdminList,
  TAdminUpdateProps,
} from "./admin-types"

@injectable()
export class AdminService {
  private prisma: PrismaClient
  constructor(@inject(PrismaService) private readonly prismaService: PrismaService) {
    this.prisma = this.prismaService.prisma
  }
  list = async (): Promise<TAdminList[]> => {
    return await this.prisma.admin.findMany({
      select: { id: true, login: true, email: true, is_super: true },
      orderBy: { login: "asc" },
    })
  }
  getAdmin = async (id: string): Promise<TAdmin> => {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: { id: true, login: true, email: true, is_super: true },
    })
    if (!admin) {
      throw new Error("Unknown admin")
    }
    return admin
  }
  create = async (data: TAdminCreateProps, super_id: string): Promise<string> => {
    try {
      const super_admin = await this.prisma.admin.findUnique({ where: { id: super_id } })
      if (!super_admin || !super_admin.is_super) {
        throw new Error("Forbidden")
      }
      if (data.password !== data.confirm_password) {
        throw new Error("Passwords doesn't match")
      }
      const create_data = {
        login: data.login,
        email: data.email,
      }
      const salt = genSaltSync(16)
      const password = hashSync(data.password, salt)
      const admin = await this.prisma.admin.create({
        data: create_data,
        select: { id: true },
      })
      await this.prisma.adminSalt.create({
        data: { salt, admin: { connect: { id: admin.id } } },
      })
      await this.prisma.adminPassword.create({
        data: { password, admin: { connect: { id: admin.id } } },
      })
      return admin.id
    } catch (e) {
      throw e
    }
  }
  update = async (id: string, data: TAdminUpdateProps): Promise<TAdmin> => {
    const admin = await this.prisma.admin.update({
      where: { id },
      data,
      select: { id: true, login: true, email: true, is_super: true },
    })
    if (!admin) {
      throw new Error("Unknown admin")
    }
    return admin
  }
  changePassword = async (id: string, data: TAdminChangePasswordProps) => {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: { id: true },
    })
    if (!admin) {
      throw new Error("Unknown admin")
    }
    const password = await this.prisma.admin
      .findUnique({ where: { id } })
      .password({ select: { password: true } })
    if (!password) {
      throw new Error("password not found")
    }
    const pass_valid = await compare(data.old_password, password.password)
    if (!pass_valid || data.new_password !== data.confirm_password) {
      throw new Error("pair doesn't match")
    }
    const salt = genSaltSync(16)
    const new_password = hashSync(data.new_password, salt)
    await this.prisma.adminSalt.updateMany({
      where: { admin: { id } },
      data: { salt },
    })
    await this.prisma.adminPassword.updateMany({
      where: { admin: { id } },
      data: { password: new_password },
    })
    return admin
  }
  deleteAdmin = async (id: string, super_id: string): Promise<TAdminList[]> => {
    const [super_admin, admin] = await Promise.all([
      this.prisma.admin.findUnique({ where: { id: super_id } }),
      this.prisma.admin.findUnique({ where: { id } }),
    ])
    if (super_admin && super_admin.is_super && admin && !admin.is_super) {
      await this.prisma.adminSalt.deleteMany({ where: { admin: { id } } })
      await this.prisma.adminPassword.deleteMany({ where: { admin: { id } } })
      await this.prisma.admin.delete({ where: { id } })
    } else {
      throw new Error("Forbidden")
    }
    return await this.prisma.admin.findMany({
      select: { id: true, login: true, email: true, is_super: true },
      orderBy: { login: "asc" },
    })
  }
}
