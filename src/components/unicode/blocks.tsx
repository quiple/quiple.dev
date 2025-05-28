import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'

interface UnicodeBlock {
  first: string
  last: string
  name: string
  nameKo: string
}

interface UnicodeData {
  code: string
}

export function BlocksTable({blocks, data}: {blocks: UnicodeBlock[]; data: UnicodeData[]}) {
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
        {blocks.map((block: UnicodeBlock) => {
          const count = data.filter((char) => {
            return (
              parseInt(char.code, 16) >= parseInt(block.first, 16) &&
              parseInt(char.code, 16) <= parseInt(block.last, 16)
            )
          }).length

          return ['private', 'surrogate'].some((i) => block.name.toLowerCase().includes(i)) ? (
            <TableRow key={block.first} className="pointer-events-none">
              <TableCell>
                U+{block.first}~{block.last}
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
                location.href = `/unicode/block/${block.first.toLowerCase()}`
              }}
            >
              <TableCell className="tabular-nums">
                U+{block.first}~{block.last}
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
