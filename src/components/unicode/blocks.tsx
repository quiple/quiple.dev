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

export function BlocksTable({unicodeBlocks}: {unicodeBlocks: UnicodeBlock[]}) {
  return (
    <Table>
      <TableHeader className="pointer-events-none">
        <TableRow>
          <TableHead>범위</TableHead>
          <TableHead>이름</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {unicodeBlocks.map((block: UnicodeBlock) => (
          <TableRow
            key={block.id}
            className="cursor-pointer"
            onClick={() => {
              location.href = `/unicode/block/${block.id.toLowerCase()}`
            }}
          >
            <TableCell>
              U+{block.id}~{block.data.last}
            </TableCell>
            <TableCell>
              {block.data.nameKo}
              <small className="block">{block.data.name}</small>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
