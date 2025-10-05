'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { selectCoin } from '@/lib/store/slice'
import { Cryptocurrency } from '@/lib/types/crypto.types'
import { formatPrice } from '@/lib/utils/formatPrice'
import { FC } from 'react'

interface RowCardProps {
  coin: Cryptocurrency
}

const RowCard: FC<RowCardProps> = ({ coin }) => {
  const dispatch = useAppDispatch()
  const selectedCoinId = useAppSelector(state => state.crypto.selectedCoinId)

  const handleClick = () => {
    dispatch(selectCoin(coin.id))
  }

  return (
    <li
      onClick={handleClick}
      className={`flex items-center justify-between p-2 cursor-pointer transition-all duration-500 ${
        selectedCoinId === coin.id ? 'bg-gradient-to-r from-[#AF53FF] to-[#6EACFE] text-white' : ' '
      }`}
    >
      <div className="flex items-center space-x-2">
        <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
        <span>
          {coin.name} ({coin.symbol.toUpperCase()})
        </span>
      </div>
      <span>{coin.current_price ? formatPrice(coin.current_price) : '...'}</span>
    </li>
  )
}

export default RowCard
