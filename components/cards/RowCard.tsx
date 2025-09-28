import { Cryptocurrency } from '@/lib/types/crypto.types'
import React from 'react'

interface RowCardProps {
  coin: Cryptocurrency
  selectedCoinId: string | null
  select: () => void
}

const RowCard = ({ coin, select, selectedCoinId }: RowCardProps) => {
  return (
    <li
      onClick={select}
      className={`flex items-center justify-between p-2 rounded cursor-pointer ${
        selectedCoinId === coin.id ? 'bg-yellow-400 text-black font-bold'  : 'bg-gray-800'
      }`}
    >
      <div className="flex items-center space-x-2">
        <img src={coin.image} alt={coin.name} className="w-6 h-6" />
        <span>
          {coin.name} ({coin.symbol.toUpperCase()})
        </span>
      </div>
      <span className="text-green-400">{coin.current_price}</span>
    </li>
  )
}

export default RowCard
