export default {
  name: 'galmuri',
  title: 'Galmuri',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'showcase',
      title: '쇼케이스',
      type: 'array',
      validation: (rule) => rule.required(),
      of: [{type: 'game'}],
    },
  ],
}
