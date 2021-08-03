import { TodoList as TodoListType } from '@prisma/client'
import { ApolloError } from 'apollo-server-express'
import { list, mutationField, nonNull, objectType, queryField, subscriptionField } from 'nexus'

import { prisma } from '../prismaSetup'
import { pubsub } from '../pubsub'

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

const TODOLIST_CREATED = 'TODOLIST_CREATED'
const TODOLIST_REMOVED = 'TODOLIST_CREATED'

export const CreateTodoListMutation = mutationField('createTodoList', {
  type: nonNull('TodoList'),
  args: { title: 'String', workspaceId: nonNull('String') },
  resolve: (_, { title, workspaceId }) => {
    const newTodoList = prisma.todoList.create({ data: { title, workspaceId } })
    pubsub.publish(`${TODOLIST_CREATED}-${workspaceId}`, newTodoList)

    return newTodoList
  },
})

export const CreateTodoListSubscription = subscriptionField('createTodoList', {
  type: 'TodoList',
  args: { workspaceId: nonNull('String') },
  subscribe: (_, { workspaceId }) => pubsub.asyncIterator(`${TODOLIST_CREATED}-${workspaceId}`),
  resolve: (eventData: TodoListType) => eventData,
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
