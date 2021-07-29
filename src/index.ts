import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    helloWorld(name: String): String!
  }
`

const resolvers = {
  Query: {
    helloWorld: (_, { name }) => (name ? `Hi, ${name}!` : 'Hello World'),
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
