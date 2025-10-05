'use client'

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { fetchGlobals } from '@/lib/store/slice'
import { DollarSign, TrendingUp, Bitcoin, Activity, Clock } from 'lucide-react'
import { formatNumber } from '@/lib/utils/formatPrice'

const GlobalData = () => {
  const dispatch = useAppDispatch()
  const { globals, status } = useAppSelector(state => state.crypto)

  useEffect(() => {
    dispatch(fetchGlobals())
  }, [dispatch])

  if (status === 'loading') return <p>Loading global data...</p>
  if (!globals) return <p>No data</p>

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-white h-fit">
      
      <div className="flex flex-col col-span-2 p-4 rounded-lg border border-border bg-[#151823]">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-green-400" />
          <h2 className="text-[#43465C]">Total M. Cap</h2>
        </div>
        <span className="text-xl font-semibold">
          ${formatNumber(globals.total_market_cap.usd)}
        </span>
      </div>

      <div className="flex flex-col p-4 rounded-lg border border-border bg-[#151823]">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h2 className="text-[#43465C]">24h Market Cap Change</h2>
        </div>
        <span
          className={`text-xl font-semibold ${
            globals.market_cap_change_percentage_24h_usd >= 0
              ? 'text-green-400'
              : 'text-red-400'
          }`}
        >
          {globals.market_cap_change_percentage_24h_usd.toFixed(2)}%
        </span>
      </div>

      <div className="flex flex-col p-4 rounded-lg border border-border bg-[#151823]">
        <div className="flex items-center gap-2 mb-2">
          <Bitcoin className="w-5 h-5 text-yellow-400" />
          <h2 className="text-[#43465C]">Dominance</h2>
        </div>
        <span className="text-xl font-semibold">
          {globals.market_cap_percentage.btc.toFixed(2)}%
        </span>
      </div>

      <div className="flex flex-col col-span-2 p-4 rounded-lg border border-border bg-[#151823]">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-purple-400" />
          <h2 className="text-[#43465C]">Total Volume (USD)</h2>
        </div>
        <span className="text-xl font-semibold">
          ${formatNumber(globals.total_volume.usd)}
        </span>
      </div>

    </div>
  )
}

export default GlobalData
