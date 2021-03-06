import { mutationField, nonNull, objectType, queryField } from 'nexus'

import { prisma } from '../prismaSetup'

export const Workspace = objectType({
  name: 'Workspace',
  definition: t => {
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.nonNull.boolean('isShared')
    t.nonNull.string('ownerId')
    t.nonNull.list.field('todoLists', {
      type: nonNull('TodoList'),
      resolve: ({ id }) => prisma.todoList.findMany({ where: { workspaceId: id } }),
    })
  },
})

export const GetWorkspaceByIdQuery = queryField('getWorkspace', {
  type: 'Workspace',
  args: { id: nonNull('String') },
  resolve: (_, { id }) => prisma.workspace.findUnique({ where: { id } }),
})

export const CreateWorkspaceMutation = mutationField('createWorkspace', {
  type: nonNull('Workspace'),
  args: { title: nonNull('String') },
  resolve: (_, { title }, { currentUserId }) => {
    const newWorkspace = prisma.workspace.create({ data: { title, ownerId: currentUserId } })
    return newWorkspace
  },
})

export const DeleteWorkspaceMutation = mutationField('deleteWorkspace', {
  type: 'Workspace',
  args: { id: nonNull('String') },
  resolve: (_, { id }) => prisma.workspace.delete({ where: { id } }),
})

export const UpdateWorkspaceMutation = mutationField('updateWorkspace', {
  type: 'Workspace',
  args: { id: nonNull('String'), isShared: 'Boolean', title: 'String' },
  resolve: (_, { id, isShared, title }) =>
    prisma.workspace.update({ where: { id }, data: { isShared: isShared ?? undefined, title: title ?? undefined } }),
})
