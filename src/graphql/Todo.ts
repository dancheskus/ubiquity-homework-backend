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

export const CreateTodoListMutation = mutationField('createTodoList', {
  type: 'TodoList',
  args: { title: 'String', workspaceId: nonNull('String') },
  resolve: (_, { title, workspaceId }) => prisma.todoList.create({ data: { title, workspaceId } }),
})

export const DeleteTodoListMutation = mutationField('deleteTodoList', {
  type: 'TodoList',
  args: { id: nonNull('String') },
  resolve: (_, { id }) => prisma.todoList.delete({ where: { id } }),
})

export const UpdateTodoListMutation = mutationField('updateTodoList', {
  type: 'TodoList',
  args: { id: nonNull('String'), isLocked: 'Boolean', title: 'String' },
  resolve: (_, { id, isLocked, title }) =>
    prisma.todoList.update({ where: { id }, data: { isLocked: isLocked ?? undefined, title } }),
})
