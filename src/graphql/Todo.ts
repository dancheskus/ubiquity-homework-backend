import { objectType } from 'nexus'

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
