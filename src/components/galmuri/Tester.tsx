import React from 'react'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { fonts, pangramEn, pangramKo } from '@/components/galmuri/data'

export function Tester() {
  const [exampleText, setExampleText] = useState('')

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

  return (
    <section className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <Select defaultValue="g11">
          <SelectTrigger className='w-auto'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => {
              return (
                <SelectItem key={font} value={`g${font.replaceAll(' ', '-')}`}>
                  {`Galmuri${font}`}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Button onClick={shuffle}>예문 섞기</Button>
      </div>
      <Textarea defaultValue={exampleText} />
    </section>
  )
}
