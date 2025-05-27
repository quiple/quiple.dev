import type {RenderedContent} from 'astro:content'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'

interface UnicodeBlock {
  id: string
  body?: string
  collection: 'unicodeBlocks'
  data: {
    last: string
    nameKo: string
    name: string
  }
  rendered?: RenderedContent
  filePath?: string
}

interface UnicodeData {
  code: string
  name: string
  genCat: string
  combCls: string
  bidiCat: string
  decMap: string
  decDigVal: number
  digVal: number
  numVal: number
  mir: boolean
  oneName: string
  cmt: string
  uc: string
  lc: string
  tc: string
}

export function BlocksTable({
  unicodeBlocks,
  unicodeData,
}: {
  unicodeBlocks: UnicodeBlock[]
  unicodeData: UnicodeData[]
}) {
  return (
    <Table>
      <TableHeader className="pointer-events-none">
        <TableRow>
          <TableHead>범위</TableHead>
          <TableHead>이름</TableHead>
          <TableHead className="text-right">문자 수</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {unicodeBlocks.map((block: UnicodeBlock) => {
          const count = unicodeData.filter((char) => {
            return (
              parseInt(char.code, 16) >= parseInt(block.id, 16) &&
              parseInt(char.code, 16) <= parseInt(block.data.last, 16)
            )
          }).length

          return ['private', 'surrogate'].some((i) => block.data.name.toLowerCase().includes(i)) ? (
            <TableRow key={block.id} className="pointer-events-none">
              <TableCell>
                U+{block.id}~{block.data.last}
              </TableCell>
              <TableCell>
                {block.data.nameKo}
                <small className="block">{block.data.name}</small>
              </TableCell>
              <TableCell className="text-right tabular-nums">0</TableCell>
            </TableRow>
          ) : (
            <TableRow
              key={block.id}
              className="cursor-pointer"
              onClick={() => {
                location.href = `/unicode/block/${block.id.toLowerCase()}`
              }}
            >
              <TableCell className="tabular-nums">
                U+{block.id}~{block.data.last}
              </TableCell>
              <TableCell>
                {block.data.nameKo}
                <small className="block">{block.data.name}</small>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {Intl.NumberFormat('ko-KR').format(count)}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
