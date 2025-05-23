import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table'

export function BlocksTable({unicodeBlocks}: {unicodeBlocks: any}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>범위</TableHead>
          <TableHead>이름</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {unicodeBlocks.map((block: any) => (
          <TableRow key={block.data.id}>
            <TableCell>
              {block.data.id}~{block.data.last}
            </TableCell>
            <TableCell>{block.data.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
