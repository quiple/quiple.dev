export default {
  name: 'game',
  title: '게임',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'author',
      title: '저작권자 또는 제작자',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'type',
      title: '유형',
      type: 'string',
      options: {
        list: [
          {title: 'Steam', value: 'steam'},
          {title: 'App Store', value: 'appstore'},
          {title: '사용자 패치', value: 'patch'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'url',
      title: 'URL',
      type: 'string',
    },
    {
      name: 'screenshot',
      title: '스크린샷',
      type: 'image',
      validation: (rule) => rule.required(),
    },
  ],
}
