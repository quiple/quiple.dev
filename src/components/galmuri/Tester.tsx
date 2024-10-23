import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { fonts } from './data'

export function Tester() {
  return (
    <>
      <Select defaultValue="g11">
        <SelectTrigger>
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
      <Textarea />
    </>
  )
}
