import { ApolloError } from 'apollo-server'
import { list, mutationField, nonNull, objectType, queryField } from 'nexus'

import { prisma } from '../prismaSetup'

export const TodoList = objectType({
  name: 'TodoList',
  definition: t => {
    t.nonNull.string('id')
    t.string('title')
    t.nonNull.boolean('isLocked')
    t.nonNull.string('workspaceId')
    t.nonNull.list.field('todoItems', {
      type: nonNull('TodoItem'),
      resolve: ({ id }) => prisma.todoItem.findMany({ where: { todoListId: id } }),
    })
  },
})

export const GetTodoListsByWorkspaceQuery = queryField('todoLists', {
  type: nonNull(list(nonNull('TodoList'))),
  args: { workspaceId: nonNull('String') },
  resolve: (_, { workspaceId }) => prisma.todoList.findMany({ where: { workspaceId } }),
})

export const GetTodoListByIdQuery = queryField('todoList', {
  type: nonNull('TodoList'),
  args: { id: nonNull('String') },
  resolve: async (_, { id }) => {
    const todoList = await prisma.todoList.findUnique({ where: { id } })
    if (!todoList) throw new ApolloError('Todo list not found')

    return todoList
  },
})

export const CreateTodoListMutation = mutationField('createTodoList', {
  type: nonNull('TodoList'),
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
