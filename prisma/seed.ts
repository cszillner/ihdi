import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

const seed = async () => {
  await db.user.deleteMany()

  await db.user.create({
    data: {
      name: 'Usuário Teste',
      email: 'email@email.com',
      password: await bcrypt.hash('123456',10)
    }
  })

}

seed().finally(() => db.$disconnect())