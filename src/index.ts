import { v4 as uuidv4 } from 'uuid'

import { prisma } from './prismaSetup'
import { server } from './server'

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

// createNewUser()

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
