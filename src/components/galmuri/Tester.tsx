import { bigFamily, type font, fonts, pangramEn, pangramKo } from '@/components/galmuri/data'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'

export function Tester() {
  const [exampleText, setExampleText] = useState('')
  const [testerFont, setTesterFont] = useState<font | undefined>({
    family: `${bigFamily}11`,
    name: `${bigFamily}11`,
    slug: 'g11',
  })

  function shuffle() {
    let randIndexEn = 0
    let lastIndexEn = 0
    let randIndexKo = 0
    let lastIndexKo = 0

    do {
      randIndexEn = Math.floor(Math.random() * pangramEn.length)
    } while (randIndexEn === lastIndexEn)
    do {
      randIndexKo = Math.floor(Math.random() * pangramKo.length)
    } while (randIndexKo === lastIndexKo)

    setExampleText(`${pangramKo[randIndexKo]}\n${pangramEn[randIndexEn]}`)
    lastIndexEn = randIndexEn
    lastIndexKo = randIndexKo
  }

  useEffect(shuffle, [])

  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Select
          defaultValue="g11"
          onValueChange={(e) => setTesterFont(fonts.find((f) => f.slug === e))}
        >
          <SelectTrigger className="w-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => {
              return (
                <SelectItem key={font.slug} value={font.slug}>
                  {font.name}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Button onClick={shuffle}>예문 섞기</Button>
      </div>
      <Textarea
        style={{
          fontFamily: `${testerFont?.family}-web, ${testerFont?.slug.startsWith('gm') ? 'monospace' : 'sans-serif'}`,
          fontWeight: testerFont?.slug === 'g11b' ? 700 : 400,
          fontStretch: testerFont?.slug === 'g11c' ? 'condensed' : 'normal',
        }}
        value={exampleText}
        onChange={(e) => setExampleText(e.target.value)}
      />
    </section>
  )
}
