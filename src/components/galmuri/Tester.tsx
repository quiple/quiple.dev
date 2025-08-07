import {useEffect, useRef, useState} from 'react'

import {bigFamily, type font, fonts, pangramEn, pangramKo} from '@/components/galmuri/data'
import {Button} from '@/components/ui/button'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Slider} from '@/components/ui/slider'
import {Textarea} from '@/components/ui/textarea'

export function Tester() {
  const [fontSize, setFontSize] = useState(24)
  const [exampleText, setExampleText] = useState('')
  const [testerFont, setTesterFont] = useState<font | undefined>({
    family: `${bigFamily}11`,
    name: `${bigFamily}11`,
    size: 12,
    slug: 'g11',
  })

  const lastIndexEn = useRef(0)
  const lastIndexKo = useRef(0)

  useEffect(() => {window.innerWidth >= 640 && setFontSize(36)}, [])

  function shuffle() {
    let randIndexEn: number, randIndexKo: number
    do {
      randIndexEn = Math.floor(Math.random() * pangramEn.length)
    } while (randIndexEn === lastIndexEn.current)
    do {
      randIndexKo = Math.floor(Math.random() * pangramKo.length)
    } while (randIndexKo === lastIndexKo.current)
    setExampleText(`${pangramKo[randIndexKo]}\n${pangramEn[randIndexEn]}`)
    lastIndexEn.current = randIndexEn
    lastIndexKo.current = randIndexKo
  }

  useEffect(shuffle, [])

  return (
    <section className="tester">
      <div className="control">
        <div className="left">
          <Select
            defaultValue="g11"
            onValueChange={(e) => setTesterFont(fonts.find((f) => f.slug === e))}
          >
            <SelectTrigger aria-label="폰트 선택" className="tester-select">
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
          <Slider
            className="tester-slider slider"
            value={[fontSize]}
            onValueChange={(e) => setFontSize(e[0])}
            min={8}
            max={120}
            step={1}
          />
          <div className="tester-font-size">{`${fontSize}px`}</div>
        </div>
        <Button
          aria-label="예문 섞기"
          variant="outline"
          className="shuffle button outline-button"
          onClick={shuffle}
        >
          예문 섞기
        </Button>
      </div>
      <label hidden htmlFor="story">
        Galmuri 폰트 테스트
      </label>
      <Textarea
        className="textarea"
        autosize="true"
        style={{
          fontFamily: `${testerFont?.family}-web, ${testerFont?.slug.startsWith('gm') ? 'monospace' : 'sans-serif'}`,
          fontWeight: testerFont?.style === 'bold' ? 700 : 400,
          fontStretch: testerFont?.style === 'condensed' ? 'condensed' : 'normal',
          fontSize: fontSize,
        }}
        value={exampleText}
        onChange={(e) => setExampleText(e.target.value)}
        spellCheck={false}
      />
    </section>
  )
}
