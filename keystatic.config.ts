import {config, fields, singleton} from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: 'quiple/quiple.dev',
  },
  singletons: {
    settings: singleton({
      label: '설정',
      schema: {},
    }),
    index: singleton({
      label: '메인 페이지',
      schema: {},
    }),
    galmuri: singleton({
      label: 'Galmuri',
      path: 'src/contents/galmuri/',
      format: {data: 'json'},
      schema: {
        title: fields.text({label: '제목', validation: {isRequired: true}}),
        description: fields.text({label: '설명'}),
        tagline: fields.text({label: '태그라인', multiline: true}),
        showcase: fields.array(
          fields.object({
            title: fields.text({label: '제목', validation: {isRequired: true}}),
            author: fields.text({label: '저작권자 또는 제작자', validation: {isRequired: true}}),
            type: fields.select({
              label: '유형',
              options: [
                {label: 'Steam', value: 'steam'},
                {label: 'App Store', value: 'appstore'},
                {label: '사용자 패치', value: 'patch'},
              ],
              defaultValue: 'steam',
            }),
            link: fields.text({label: '링크'}),
            screenshot: fields.image({label: '스크린샷', validation: {isRequired: true}}),
          }),
          {
            label: '쇼케이스',
            itemLabel: (props) => props.fields.title.value,
          },
        ),
        content: fields.mdx({label: '내용'}),
      },
    }),
  },
})
