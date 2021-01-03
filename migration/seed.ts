import { PrismaClient } from "@prisma/client"
import { passwordHashing } from "../src/utils"

const prisma = new PrismaClient()
const seed = async () => {
  try {
    const email = "admin@admin.com"
    const login = "admin"
    const password = "admin"
    const hash_pass = passwordHashing(password)
    const admin = await prisma.admin.create({
      data: {
        email,
        login,
      },
    })
    await prisma.adminSalt.create({
      data: { salt: hash_pass.salt, admin: { connect: { id: admin.id } } },
    })
    await prisma.adminPassword.create({
      data: { password: hash_pass.hash, admin: { connect: { id: admin.id } } },
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
