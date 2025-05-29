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
  totalPages,
  url,
}: {
  currentPage: number
  totalPages: number
  url: string
}) {
  return (
    <Pagination className="mt-4">
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
        {((totalPages === 11 && currentPage > 6) || currentPage === 6) && (
          <PaginationItem>
            <PaginationLink href={`${url}/3`}>3</PaginationLink>
          </PaginationItem>
        )}
        {totalPages !== 11 && currentPage > 6 && (
          <PaginationItem>
            <PaginationEllipsis className="opacity-50" />
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage > totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage - 7}`}>{currentPage - 7}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage > totalPages - 2 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage - 6}`}>{currentPage - 6}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage > totalPages - 3 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage - 5}`}>{currentPage - 5}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage > totalPages - 4 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage - 4}`}>{currentPage - 4}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage > totalPages - 5 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage - 3}`}>{currentPage - 3}</PaginationLink>
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
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage + 2}`}>{currentPage + 2}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage < 6 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage + 3}`}>{currentPage + 3}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage < 5 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage + 4}`}>{currentPage + 4}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage < 4 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage + 5}`}>{currentPage + 5}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage < 3 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage + 6}`}>{currentPage + 6}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages > 10 && currentPage < 2 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${currentPage + 7}`}>{currentPage + 7}</PaginationLink>
          </PaginationItem>
        )}
        {totalPages !== 11 && currentPage < totalPages - 5 && (
          <PaginationItem>
            <PaginationEllipsis className="opacity-50" />
          </PaginationItem>
        )}
        {((totalPages === 11 && currentPage < 7) || currentPage === totalPages - 5) && (
          <PaginationItem>
            <PaginationLink href={`${url}/${totalPages - 2}`}>{totalPages - 2}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 3 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${totalPages - 1}`}>{totalPages - 1}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationLink href={`${url}/${totalPages}`}>{totalPages}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
            href={`${url}/${currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
