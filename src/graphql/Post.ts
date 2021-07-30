import { queryField, objectType, nonNull, list } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('body')
    t.boolean('published')
  },
})

export const PostQuery = queryField('posts', {
  type: nonNull(list(nonNull('Post'))),
  resolve: () => [{ id: 1, title: 'Nexus', body: '...', published: false }],
})
