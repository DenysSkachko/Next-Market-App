import { FC } from 'react'
import PaginationButton from '../ui/PaginationButton'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
        Prev
      </PaginationButton>
      <span className="px-2">
        {currentPage} / {totalPages}
      </span>
      <PaginationButton onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </PaginationButton>
    </div>
  )
}
