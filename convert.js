import fs from 'node:fs'
import {parse} from 'csv-parse/sync'

const data = parse(await fs.promises.readFile(`${process.cwd()}/unicode_data.csv`, 'utf8'), {
  delimiter: ';',
}).map((char, i) => {
  if (i !== 0) {
    char[0] = parseInt(char[0], 16)
    char[12] = char[12] && parseInt(char[12], 16)
    char[13] = char[13] && parseInt(char[13], 16)
    char[14] = char[14] && parseInt(char[14], 16)
  }
  return char.join(';')
})

await fs.promises.writeFile(`${process.cwd()}/unicode_data.output.csv`, data.join('\n'), 'utf8')

const hangul_syllables = parse(
  await fs.promises.readFile(`${process.cwd()}/unicode_hangul_syllables.csv`, 'utf8'),
  {
    delimiter: ';',
  },
).map((char, i) => {
  if (i !== 0) {
    char[0] = parseInt(char[0], 16)
    char[12] = char[12] && parseInt(char[12], 16)
    char[13] = char[13] && parseInt(char[13], 16)
    char[14] = char[14] && parseInt(char[14], 16)
  }
  return char.join(';')
})

await fs.promises.writeFile(
  `${process.cwd()}/unicode_hangul_syllables.output.csv`,
  hangul_syllables.join('\n'),
  'utf8',
)

const blocks = parse(await fs.promises.readFile(`${process.cwd()}/unicode_blocks.csv`, 'utf8'), {
  delimiter: ';',
}).map((char, i) => {
  if (i !== 0) {
    char[0] = parseInt(char[0], 16)
    char[1] = parseInt(char[1], 16)
  }
  return char.join(';')
})

await fs.promises.writeFile(`${process.cwd()}/unicode_blocks.output.csv`, blocks.join('\n'), 'utf8')
