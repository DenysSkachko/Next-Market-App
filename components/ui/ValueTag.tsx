import { FC } from 'react'

interface ValueTagProps {
  label: string
  value?: number | string | undefined
  direction?: 'up' | 'down' | 'base'
}

export const ValueTag: FC<ValueTagProps> = ({ label, value, direction = 'base' }) => {
  if (value === undefined) return null

  return (
    <div className="border border-border p-3 rounded-lg w-full flex-1">
      <p className="text-[9px] uppercase font-medium text-gray-400">{label}:</p>
      <p
        className={`text-sm font-bold ${
          direction === 'base'
            ? 'text-white'
            : direction === 'up'
            ? 'text-up'
            : 'text-down'
        }`}
      >
        ${value.toLocaleString()}
      </p>
    </div>
  )
}
