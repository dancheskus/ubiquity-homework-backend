import { ApolloServer } from 'apollo-server-express'

import { schema } from './schema'

export const server = new ApolloServer({
  schema,
  context: ({ req: { headers } }) => ({ currentUserId: headers['current-user-id'] }),
})
