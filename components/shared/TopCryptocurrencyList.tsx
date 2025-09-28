'use client'

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { fetchCoins } from '@/lib/store/slice'
import { Cryptocurrency } from '@/lib/types/crypto.types'
import { CRYPTOCURRENCY_LIST, CRYPTOCURRENCY_LIST2 } from '@/lib/constants'
import RowCard from '../cards/RowCard'

const TopCryptocurrencyList = () => {
  const dispatch = useAppDispatch()
  const { coins, status } = useAppSelector(state => state.crypto)

  console.log('Render TopCryptocurrencyList')

  useEffect(() => {
    dispatch(fetchCoins({ ids: CRYPTOCURRENCY_LIST }))
  }, [dispatch])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error...</p>

  return (
    <div>
      <ul className="bg-gray-800 rounded-xl overflow-hidden">
        <h2 className="text-center bg-yellow-400 text-xl text-black py-2"> Top 10 Cryptocurrencies</h2>
        {coins.map((coin: Cryptocurrency) => (
          <RowCard
            key={coin.id}
            name={coin.name}
            image={coin.image}
            id={coin.id}
            symbol={coin.symbol}
          />
        ))}
      </ul>
    </div>
  )
}

export default TopCryptocurrencyList
