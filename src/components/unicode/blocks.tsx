import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'

interface UnicodeBlock {
  first: number
  last: number
  name: string
  nameKo: string | null
}

interface UnicodeData {
  code: number
}

export function BlocksTable({blocks, data}: {blocks: UnicodeBlock[]; data: UnicodeData[]}) {
  return (
    <Table>
      <TableHeader className="pointer-events-none">
        <TableRow>
          <TableHead className="w-40">범위</TableHead>
          <TableHead>이름</TableHead>
          <TableHead className="text-right">문자 수</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blocks.map((block: UnicodeBlock) => {
          const count = data.filter((char) => {
            return char.code >= block.first && char.code <= block.last
          }).length

          return ['private', 'surrogate'].some((i) => block.name.toLowerCase().includes(i)) ? (
            <TableRow key={block.first} className="pointer-events-none">
              <TableCell>
                U+{block.first.toString(16).padStart(4, '0').toUpperCase()}~
                {block.last.toString(16).padStart(4, '0').toUpperCase()}
              </TableCell>
              <TableCell>
                {block.nameKo}
                <small className="block">{block.name}</small>
              </TableCell>
              <TableCell className="text-right tabular-nums">0</TableCell>
            </TableRow>
          ) : (
            <TableRow
              key={block.first}
              className="cursor-pointer"
              onClick={() => {
                location.href = `/unicode/block/${block.first.toString(16).padStart(4, '0')}`
              }}
            >
              <TableCell className="tabular-nums">
                U+{block.first.toString(16).padStart(4, '0').toUpperCase()}~
                {block.last.toString(16).padStart(4, '0').toUpperCase()}
              </TableCell>
              <TableCell>
                {block.nameKo}
                <small className="block">{block.name}</small>
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
