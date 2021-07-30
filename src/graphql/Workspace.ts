import { mutationField, nonNull, objectType } from 'nexus'

import { prisma } from '../prismaSetup'

export const TodoItem = objectType({
  name: 'TodoItem',
  definition: t => {
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.string('description')
    t.float('cost')
    t.nonNull.boolean('isCompleted')
    t.nonNull.string('todoListId')
  },
})

export const TodoList = objectType({
  name: 'TodoList',
  definition: t => {
    t.nonNull.string('id')
    t.string('title')
    t.nonNull.boolean('isLocked')
    t.nonNull.string('workspaceId')
    t.nonNull.list.field('todoItems', {
      type: 'TodoItem',
      resolve: ({ id }) => prisma.todoItem.findMany({ where: { todoListId: id } }),
    })
  },
})

export const Workspace = objectType({
  name: 'Workspace',
  definition: t => {
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.nonNull.boolean('isShared')
    t.nonNull.string('ownerId')
    t.nonNull.list.field('todoLists', {
      type: 'TodoList',
      resolve: ({ id }) => prisma.todoList.findMany({ where: { workspaceId: id } }),
    })
  },
})

export const CreateWorkspaceMutation = mutationField('createWorkspace', {
  type: 'Workspace',
  args: { title: nonNull('String') },
  resolve: (_, { title }, { currentUserId }) => prisma.workspace.create({ data: { title, ownerId: currentUserId } }),
})
