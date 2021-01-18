import { Inject, Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { TAdminCreateDto, TAdminUpdateDto } from "./dto"
import { TAdminModel } from "./models"
import { PrismaEntity } from "./prisma.entity"

@Injectable()
export class AdminRepository {
  private readonly prisma: PrismaClient
  constructor(@Inject(PrismaEntity) private readonly entity: PrismaEntity) {
    this.prisma = this.entity.prisma
  }

  public async findMany(): Promise<TAdminModel[]> {
    return this.prisma.admin.findMany({
      select: { id: true, login: true, email: true, is_super: true },
      orderBy: { login: "asc" },
    })
  }

  public async getOneById(id: string): Promise<TAdminModel> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: { id: true, email: true, is_super: true, login: true },
    })
    if (!admin) {
      throw new Error("admin not found")
    }
    return admin
  }

  public async getOneByLogin(login: string): Promise<TAdminModel> {
    const admin = await this.prisma.admin.findUnique({
      where: { login },
      select: { id: true, email: true, is_super: true, login: true },
    })
    if (!admin) {
      throw new Error("admin not found")
    }
    return admin
  }

  public async createOne(input: TAdminCreateDto): Promise<string> {
    const { password, salt, ...data } = input
    const { id } = await this.prisma.admin.create({
      data,
      select: { id: true },
    })

    await this.prisma.adminSalt.create({
      data: { salt, admin: { connect: { id } } },
    })

    await this.prisma.adminPassword.create({
      data: { password, admin: { connect: { id } } },
    })

    return id
  }

  public async updateOne(input: TAdminUpdateDto): Promise<void> {
    const { id, ...data } = input
    await this.prisma.admin.update({
      where: { id },
      data,
    })
  }

  public async deleteOne(id: string): Promise<void> {
    await this.prisma.adminSalt.deleteMany({ where: { admin: { id } } })
    await this.prisma.adminPassword.deleteMany({ where: { admin: { id } } })
    await this.prisma.admin.delete({ where: { id } })
  }
}
