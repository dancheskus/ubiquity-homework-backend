import { v4 as uuidv4 } from 'uuid'

import { server } from './server'

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

// console.log(uuidv4())
