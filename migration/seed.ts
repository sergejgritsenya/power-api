import { PrismaClient } from "@prisma/client"
import { genSaltSync, hashSync } from "bcryptjs"

const prisma = new PrismaClient()
const seed = async () => {
  try {
    const email = "admin@admin.com"
    const login = "admin"
    const password = "admin"
    const salt = genSaltSync(16)
    const hash = hashSync(password, salt)
    const admin = await prisma.admin.create({
      data: {
        email,
        login,
      },
    })
    await prisma.adminSalt.create({
      data: { salt, admin: { connect: { id: admin.id } } },
    })
    await prisma.adminPassword.create({
      data: { password: hash, admin: { connect: { id: admin.id } } },
    })
    console.log("Successfully created")
  } catch (e) {
    console.error(e)
  }
  await prisma.$disconnect()
}

seed().finally(async () => {
  await prisma.$disconnect()
})
