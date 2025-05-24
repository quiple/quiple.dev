import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'

export function BlocksTable({unicodeBlocks}: {unicodeBlocks: any}) {
  return (
    <Table>
      <TableHeader className="pointer-events-none">
        <TableRow>
          <TableHead>범위</TableHead>
          <TableHead>이름</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {unicodeBlocks.map((block: any) => (
          <TableRow
            key={block.id}
            className="cursor-pointer"
            onClick={() => {
              location.href = `/unicode/block/${block.id.toLowerCase()}`
            }}
          >
            <TableCell>
              {block.id}~{block.data.last}
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
