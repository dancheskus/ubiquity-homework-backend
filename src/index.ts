import express from 'express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'

import { schema } from './schema'
import { server } from './server'

import { createServer } from 'http'

const startServer = async () => {
  const app = express()

  const httpServer = createServer(app)

  await server.start()
  server.applyMiddleware({ app })

  SubscriptionServer.create({ schema, execute, subscribe }, { server: httpServer, path: server.graphqlPath })

  const PORT = 4000
  httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}/graphql`))
}

startServer()
