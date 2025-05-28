import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export function Paginate({
  currentPage,
  totalPage,
  url,
}: {
  currentPage: number
  totalPage: number
  url: string
}) {
  return (
    <section className="pagiantion p-2">
      <div className="text-muted-foreground mt-4 text-sm">
        {totalPage}페이지 중 {currentPage}페이지
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
              href={`${url}/${currentPage - 1}`}
            />
          </PaginationItem>
          {currentPage > 2 && (
            <PaginationItem>
              <PaginationLink href={`${url}/${currentPage - 2}`}>{currentPage - 2}</PaginationLink>
            </PaginationItem>
          )}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink href={`${url}/${currentPage - 1}`}>{currentPage - 1}</PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink className="pointer-events-none" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage < totalPage && (
            <PaginationItem>
              <PaginationLink href={`${url}/${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
            </PaginationItem>
          )}
          {currentPage < totalPage - 1 && (
            <PaginationItem>
              <PaginationLink href={`${url}/${currentPage + 2}`}>{currentPage + 2}</PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              className={currentPage === totalPage ? 'pointer-events-none opacity-50' : undefined}
              href={`${url}/${currentPage + 1}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}
