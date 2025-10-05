'use client'

import React, { useEffect, useMemo } from 'react'
import MarkCard from '../cards/MarkCard'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { fetchCoins } from '@/lib/store/slice'
import { FIXED_COINS } from '@/lib/constants'
import { useLivePrices } from '@/hooks/useLivePrices'

export const MarkedListed = () => {
  const dispatch = useAppDispatch()
  const { lists, status } = useAppSelector(state => state.crypto)

  const PAIRS = useMemo(() => FIXED_COINS.map(c => `${c.symbol.toLowerCase()}usdt`), [])

  const { prices, flash } = useLivePrices(PAIRS)

  useEffect(() => {
    const ids = FIXED_COINS.map(c => c.name)
    dispatch(fetchCoins({ ids, listKey: 'marked' }))
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error...</p>

  return (
    <div className="flex gap-4 w-full">
      {lists.marked.map(coin => {
        const pair = `${coin.symbol.toLowerCase()}usdt`
        const livePrice = prices[pair]
        const flashColor = flash[pair]

        return (
          <MarkCard
            key={coin.id}
            name={coin.name}
            image={coin.image}
            percent={coin.price_change_percentage_24h}
            id={coin.id}
            price={livePrice ?? coin.current_price}
            flash={flashColor}
          />
        )
      })}

      <div className="bg-gradient-to-l from-[#AF53FF] to-[#6EACFE] border border-[#303241] rounded-xl flex-1 flex-center">
        
      </div>
    </div>
  )
}
 