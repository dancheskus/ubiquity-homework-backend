import { list, nonNull, objectType, queryField } from 'nexus'

import { prisma } from '../prismaSetup'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
  },
})

export const UserQuery = queryField('user', {
  type: 'User',
  args: { id: 'String' },
  resolve: (_, { id }) => prisma.user.findUnique({ where: { id: id || undefined } }),
})

export const UsersQuery = queryField('users', {
  type: nonNull(list(nonNull('User'))),
  resolve: () => prisma.user.findMany(),
})
