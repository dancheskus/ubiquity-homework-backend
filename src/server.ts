import { ApolloServer } from 'apollo-server'

import { schema } from './schema'

export const server = new ApolloServer({
  schema,
  context: ({ req: { headers } }) => {
    console.log(headers)
    return { currentUserId: headers['current-user-id'] }
  },
})
