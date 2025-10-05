'use client'

import { formatPrice } from '@/lib/utils/formatPrice'
import React, { FC } from 'react'

interface MarkCardProps {
  id: string
  name: string
  image: string
  symbol?: string
  percent?: number
  price?: number
  flash?: 'green' | 'red' | null
}

const MarkCard: FC<MarkCardProps> = ({ id, name, image, percent, price, flash }) => {
  const isPositive = percent !== undefined && percent >= 0
  const priceChangeColor =
    percent === undefined ? 'text-gray-400' : isPositive ? 'text-green-400' : 'text-red-400'

  const flashColor =
    flash === 'green' ? 'text-green-400' : flash === 'red' ? 'text-red-400' : 'text-white'

  return (
    <div className="bg-[#171822] border border-[#303241] rounded-xl w-60 text-white">
      <div className="flex flex-col gap-2 py-4 px-3">
        <div className="flex items-center">
          <img src={image} alt={name} className="w-6 h-6 rounded-full" />
          <h4 className="ml-2">{name} (24h)</h4>
          <span className={`${priceChangeColor} ml-1 text-[10px]`}>
            {isPositive && <span>+</span>}
            {percent !== undefined ? percent.toFixed(2) : '0.00'}%
          </span>
        </div>
        <p className="font-semibold text-2xl">
          <span className="text-[#303241] font-normal">$</span>
          <span className={flashColor}>{price !== undefined ? formatPrice(price) : '...'}</span>
        </p>
      </div>
    </div>
  )
}

export default MarkCard
