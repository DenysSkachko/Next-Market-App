'use client'

import { FC } from 'react'

interface PaginationButtonProps {
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

const PaginationButton: FC<PaginationButtonProps> = ({ disabled, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-5 py-1 border border-border rounded-lg disabled:opacity-50 disabled:pointer-events-none hover:bg-border transition cursor-pointer"
    >
      {children}
    </button>
  )
}

export default PaginationButton
