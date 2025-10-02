'use client'

import React from 'react'
import { useAppSelector } from '@/hooks/useStore'
import { Cryptocurrency } from '@/lib/types/crypto.types'
import { ValueTag } from '../ui/ValueTag'

const SelectedCard = () => {
  const selectedCoinId = useAppSelector(state => state.crypto.selectedCoinId)
  const coins = useAppSelector(state => state.crypto.lists.all)
  const coin: Cryptocurrency | undefined = coins.find(c => c.id === selectedCoinId)

  if (!coin) {
    return <div className="p-6 text-gray-400 text-center text-lg">No coin selected</div>
  }

  const priceChangeColor =
    coin.price_change_percentage_24h && coin.price_change_percentage_24h >= 0
      ? 'text-green-400'
      : 'text-red-400'

  return (
    <div className="border border-border rounded-xl overflow-hidden p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-16 h-16 rounded-full border border-gray-700"
          />
          <div>
            <h2 className="text-2xl font-bold">{coin.name}</h2>
            <p className="text-gray-400 uppercase tracking-wide">{coin.symbol}</p>
          </div>
          {coin.market_cap_rank !== undefined && (
            <div className="ml-auto flex items-end gap-0.5">
              <span className="text-xl text-border">#</span>
              <p className="text-2xl font-semibold text-white">{coin.market_cap_rank}</p>
            </div>
          )}
        </div>
        <div className=" px-3 pt-2 pb-2.5 rounded-lg flex items-center mb-2">
          {coin.current_price !== undefined && (
            <p className="text-2xl font-semibold tracking-wide text-white">
              <span className="text-[#303241] font-normal">$</span>
              {coin.current_price}
            </p>
          )}
          {coin.price_change_percentage_24h !== undefined && (
            <span className={`ml-auto text-lg font-semibold ${priceChangeColor}`}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-2">
          <ValueTag label="Market Cap" value={coin.market_cap} />
          <ValueTag label="Volume (24h)" value={coin.total_volume} />
          <ValueTag label="Total Supply" value={coin.total_supply} />
        </div>
        <div className="flex gap-4 text-center">
          <ValueTag label="High (24h)" value={coin.high_24h} direction="up" />
          <ValueTag label="Low (24h)" value={coin.low_24h} direction="down" />
        </div>
      </div>
    </div>
  )
}

export default SelectedCard
