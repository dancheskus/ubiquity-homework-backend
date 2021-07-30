import { nonNull, queryField } from 'nexus'

export const Hello = queryField('hello', {
  type: nonNull('String'),
  args: { name: 'String' },
  resolve: (_, { name }) => (name ? `Hi, ${name}!` : 'Hello World'),
})
