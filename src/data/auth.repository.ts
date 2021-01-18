import { Inject, Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { TPasswordUpdateDto } from "./dto"
import { PrismaEntity } from "./prisma.entity"

@Injectable()
export class AuthRepository {
  private readonly prisma: PrismaClient
  constructor(@Inject(PrismaEntity) private readonly entity: PrismaEntity) {
    this.prisma = this.entity.prisma
  }

  public async getPasswordByAdminId(admin_id: string): Promise<string> {
    const password = await this.prisma.adminPassword.findUnique({
      where: { admin_id },
      select: { password: true },
    })

    if (!password) {
      throw new Error("password not found")
    }

    return password.password
  }

  public async getPasswordByLogin(login: string): Promise<string> {
    const password = await this.prisma.adminPassword.findFirst({
      where: { admin: { login } },
      select: { password: true },
    })

    if (!password) {
      throw new Error("password not found")
    }

    return password.password
  }

  public async updateOne(input: TPasswordUpdateDto): Promise<void> {
    const { admin_id, password, salt } = input

    await this.prisma.adminSalt.update({
      where: { admin_id },
      data: { salt },
    })

    await this.prisma.adminPassword.update({
      where: { admin_id },
      data: { password },
    })
  }
}
