'use client'

import React, { useEffect } from 'react'
import MarkCard from '../cards/MarkCard'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { fetchCoins } from '@/lib/store/slice'
import { CRYPTOCURRENCY_LIST2 } from '@/lib/constants'

export const MarkedListed = () => {
  const dispatch = useAppDispatch()
  const { lists, status } = useAppSelector(state => state.crypto)

  useEffect(() => {
    dispatch(fetchCoins({ ids: CRYPTOCURRENCY_LIST2, listKey: 'marked' }))
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error...</p>

  return (
    <div className="flex gap-4">
      {lists.marked.map(coin => (
        <MarkCard
          key={coin.id}
          name={coin.name}
          image={coin.image}
          percent={coin.price_change_percentage_24h}
          id={coin.id}
        />
      ))}
    </div>
  )
}
