'use client'

import React, { useEffect } from 'react'
import { useGetPricesQuery } from '@/lib/store/service'

interface RowCardProps {
  id: string
  name: string
  image: string
  symbol: string
}

const RowCard = ({ id, name, image, symbol }: RowCardProps) => {
  const { data, isLoading, isError } = useGetPricesQuery(undefined, {
    pollingInterval: 30_000,
  })
  console.log('Render RawCard')

  const price = data?.[id]?.usd

  useEffect(() => {
    if (price !== undefined) {
      console.log(`Price updated for ${name}: $${price}`)
    }
  }, [price, name])

  return (
    <li className="flex items-center justify-between p-2 cursor-pointer transition-all duration-500">
      <div className="flex items-center space-x-2">
        <img src={image} alt={name} className="w-6 h-6" />
        <span>
          {name} ({symbol.toUpperCase()})
        </span>
      </div>
      <span>{isLoading ? 'Loading...' : isError ? 'Error' : price?.toLocaleString()}$</span>
    </li>
  )
}

export default React.memo(RowCard)
