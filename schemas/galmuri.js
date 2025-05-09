export default {
  name: 'galmuri',
  title: 'Galmuri',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '제목',
      type: 'string',
    },
    {
      name: 'showcase',
      title: '쇼케이스',
      type: 'array',
      of: [{type: 'game'}],
    }
  ]
}
