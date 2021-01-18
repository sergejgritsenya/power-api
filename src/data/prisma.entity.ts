import { Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaEntity {
  prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }
}
