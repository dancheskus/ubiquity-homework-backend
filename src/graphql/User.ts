import { list, mutationField, nonNull, objectType, queryField } from 'nexus'

import { prisma } from '../prismaSetup'

export const User = objectType({
  name: 'User',
  definition: t => t.string('id'),
})

export const UserQuery = queryField('user', {
  type: 'User',
  args: { id: nonNull('String') },
  resolve: (_, { id }) => prisma.user.findUnique({ where: { id } }),
})

export const UsersQuery = queryField('users', {
  type: nonNull(list(nonNull('User'))),
  resolve: () => prisma.user.findMany(),
})

export const CreateUserMutation = mutationField('createUser', {
  type: 'User',
  resolve: (_, __, { currentUserId }) => prisma.user.create({ data: { id: currentUserId } }),
})
