import { useAppDispatch } from '@/hooks/useStore'
import { useGetPricesQuery } from '@/lib/store/service'
import React, { FC } from 'react'

interface MarkCardProps {
  id: string
  name: string
  image: string
  symbol?: string
  percent?: number
}

const MarkCard: FC<MarkCardProps> = ({ id, name, image, percent }) => {
  const { data, isLoading, isError } = useGetPricesQuery(undefined, {
    pollingInterval: 30_000,
  })

  const price = data?.[id]?.usd

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const priceChangeColor = percent && percent >= 0 ? 'text-green-400' : 'text-red-400'
  const positivePrice = percent && percent >= 0

  return (
    <div className="bg-[#171822] border border-[#303241] rounded-xl w-60 h-30 text-white">
      <div className="flex flex-col gap-2 py-4 px-3">
        <div className="flex items-center">
          <img src={image} alt={name} className="w-6 h-6 rounded-full" />
          <h4 className="ml-2">{name} (24h)</h4>
          <span className={`${priceChangeColor} ml-1 text-[10px]`}>
            {positivePrice && <span>+</span>}
            {percent !== undefined ? percent.toFixed(2) : '0.00'}%
          </span>
        </div>
        <p className="font-semibold text-2xl ">
          <span className="text-[#303241] font-normal">$</span>
          {price ? formatPrice(price) : '...'}
        </p>
      </div>
    </div>
  )
}

export default MarkCard
