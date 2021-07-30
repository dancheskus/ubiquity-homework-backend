import { makeSchema } from 'nexus'

import * as types from './graphql'

import { join } from 'path'

const createPath = (fileName: string) => join(__dirname, '../nexus_generated', fileName)

export const schema = makeSchema({
  types,
  outputs: {
    typegen: createPath('nexus-typegen.ts'),
    schema: createPath('schema.graphql'),
  },
})
