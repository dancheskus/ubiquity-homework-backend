import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

import { server } from './server'

const prisma = new PrismaClient()

const createNewUser = async () => {
  try {
    const user = await prisma.user.create({
      data: { id: uuidv4() },
    })
    console.log(user)
  } catch (e) {
    console.log(e)
  }
}

createNewUser()

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
