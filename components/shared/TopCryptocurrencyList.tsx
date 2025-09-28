'use client'

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { fetchCoins, selectCoin } from '@/lib/store/slice'
import { Cryptocurrency } from '@/lib/types/crypto.types'
import { CRYPTOCURRENCY_LIST, CRYPTOCURRENCY_LIST2 } from '@/lib/constants'
import RowCard from '../cards/RowCard'

const TopCryptocurrencyList = () => {
  const dispatch = useAppDispatch()
  const { coins, status, selectedCoinId } = useAppSelector(state => state.crypto)

  useEffect(() => {
    dispatch(fetchCoins({ ids: CRYPTOCURRENCY_LIST }))
    const interval = setInterval(() => dispatch(fetchCoins({ ids: CRYPTOCURRENCY_LIST })), 30_000)
    return () => clearInterval(interval)
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error...</p>

  return (
    <div>
      <ul>
        {coins.map((coin: Cryptocurrency) => (
          <RowCard
            key={coin.id}
            coin={coin}
            selectedCoinId={selectedCoinId}
            select={() => dispatch(selectCoin(coin.id))}
          />
        ))}
      </ul>
    </div>
  )
}

export default TopCryptocurrencyList
