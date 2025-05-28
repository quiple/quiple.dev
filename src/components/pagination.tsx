import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
    <section className="pagiantion mt-4 px-2 flex">
      <div className="grow basis-1/3" />
      <Pagination className="shrink-0 !w-fit">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
              href={`${url}/${currentPage - 1}`}
            />
          </PaginationItem>
          {currentPage > 3 && (
            <PaginationItem>
              <PaginationLink href={`${url}/1`}>1</PaginationLink>
            </PaginationItem>
          )}
          {currentPage > 4 && (
            <PaginationItem>
              <PaginationLink href={`${url}/2`}>2</PaginationLink>
            </PaginationItem>
          )}
          {currentPage === 6 && (
            <PaginationItem>
              <PaginationLink href={`${url}/3`}>3</PaginationLink>
            </PaginationItem>
          )}
          {currentPage > 6 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
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
          {currentPage < totalPage - 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage === totalPage - 5 && (
            <PaginationItem>
              <PaginationLink href={`${url}/${totalPage - 2}`}>{totalPage - 2}</PaginationLink>
            </PaginationItem>
          )}
          {currentPage < totalPage - 3 && (
            <PaginationItem>
              <PaginationLink href={`${url}/${totalPage - 1}`}>{totalPage - 1}</PaginationLink>
            </PaginationItem>
          )}
          {currentPage < totalPage - 2 && (
            <PaginationItem>
              <PaginationLink href={`${url}/${totalPage}`}>{totalPage}</PaginationLink>
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
      <div className="text-muted-foreground text-sm text-right grow basis-1/3 flex justify-end items-center">
        {totalPage}페이지 중 {currentPage}페이지
      </div>
    </section>
  )
}
