import { PrismaClient } from "@prisma/client"
import { injectable } from "inversify"

@injectable()
export class PrismaService {
  prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }
}
