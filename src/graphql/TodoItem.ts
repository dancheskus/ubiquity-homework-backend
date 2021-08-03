import { TodoItem as TodoItemType, TodoList as TodoListType } from '@prisma/client'
import { mutationField, nonNull, objectType, queryField, subscriptionField } from 'nexus'

import { prisma } from '../prismaSetup'
import { pubsub } from '../pubsub'
import { TODOLIST_UPDATED } from './TodoList'

export const TodoItem = objectType({
  name: 'TodoItem',
  definition: t => {
    t.nonNull.string('id')
    t.nonNull.string('title')
    t.string('description')
    t.int('cost')
    t.nonNull.boolean('isCompleted')
    t.nonNull.string('todoListId')
  },
})

const TODOITEM_UPDATED = 'TODOITEM_UPDATED'
const TODOITEM_DELETED = 'TODOITEM_DELETED'

export const GetTodoItemByIdQuery = queryField('todoItem', {
  type: 'TodoItem',
  args: { id: nonNull('String') },
  resolve: (_, { id }) => prisma.todoItem.findUnique({ where: { id } }),
})

export const CreateTodoItemMutation = mutationField('createTodoItem', {
  type: 'TodoItem',
  args: { title: nonNull('String'), todoListId: nonNull('String'), description: 'String', cost: 'Int' },
  resolve: async (_, { title, todoListId, cost, description }) => {
    const createdTodoItem = await prisma.todoItem.create({ data: { title, todoListId, cost, description } })

    pubsub.publish(`${TODOLIST_UPDATED}-${todoListId}`, null)

    return createdTodoItem
  },
})

export const DeleteTodoItemMutation = mutationField('deleteTodoItem', {
  type: 'TodoItem',
  args: { id: nonNull('String'), todoListId: nonNull('String') },
  resolve: (_, { id, todoListId }) => {
    const deletedTodoItem = prisma.todoItem.delete({ where: { id } })
    const updatedTodoList = prisma.todoList.findUnique({ where: { id: todoListId } })
    pubsub.publish(`${TODOITEM_DELETED}-${todoListId}`, updatedTodoList)

    return deletedTodoItem
  },
})

export const TodoItemDeletedSubscription = subscriptionField('deleteTodoItem', {
  type: 'TodoList',
  args: { todoListId: nonNull('String') },
  subscribe: (_, { todoListId }) => pubsub.asyncIterator(`${TODOITEM_DELETED}-${todoListId}`),
  resolve: (eventData: TodoListType) => eventData,
})

export const UpdateTodoItemMutation = mutationField('updateTodoItem', {
  type: 'TodoItem',
  args: { id: nonNull('String'), isCompleted: 'Boolean', title: 'String', description: 'String', cost: 'Int' },
  resolve: (_, { id, isCompleted, title, description, cost }) => {
    const updatedTodoItem = prisma.todoItem.update({
      where: { id },
      data: {
        isCompleted: isCompleted ?? undefined,
        title: title ?? undefined,
        description: description === null ? null : description ?? undefined,
        cost: cost ?? undefined,
      },
    })
    pubsub.publish(`${TODOITEM_UPDATED}-${id}`, updatedTodoItem)

    return updatedTodoItem
  },
})

export const UpdateTodoItemSubscription = subscriptionField('updateTodoItem', {
  type: 'TodoItem',
  args: { id: nonNull('String') },
  subscribe: (_, { id }) => pubsub.asyncIterator(`${TODOITEM_UPDATED}-${id}`),
  resolve: (eventData: TodoItemType) => eventData,
})
