import { mutationField, nonNull, objectType } from 'nexus'

import { prisma } from '../prismaSetup'

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

export const CreateTodoItemMutation = mutationField('createTodoItem', {
  type: 'TodoItem',
  args: { title: nonNull('String'), todoListId: nonNull('String'), description: 'String', cost: 'Int' },
  resolve: (_, { title, todoListId, cost, description }) =>
    prisma.todoItem.create({ data: { title, todoListId, cost, description } }),
})

export const DeleteTodoItemMutation = mutationField('deleteTodoItem', {
  type: 'TodoItem',
  args: { id: nonNull('String') },
  resolve: (_, { id }) => prisma.todoItem.delete({ where: { id } }),
})

export const UpdateTodoItemMutation = mutationField('updateTodoItem', {
  type: 'TodoItem',
  args: { id: nonNull('String'), isCompleted: 'Boolean', title: 'String', description: 'String', cost: 'Int' },
  resolve: (_, { id, isCompleted, title, description, cost }) =>
    prisma.todoItem.update({
      where: { id },
      data: {
        isCompleted: isCompleted ?? undefined,
        title: title ?? undefined,
        description: description ?? undefined,
        cost: cost ?? undefined,
      },
    }),
})
