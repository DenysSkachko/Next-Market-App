'use client'

import { useEffect, useRef, useState } from 'react'

type PriceMap = {
  [symbol: string]: number
}

type FlashMap = {
  [symbol: string]: 'green' | 'red' | null
}

export const useLivePrices = (pairs: string[], intervalMs = 3000) => {
  const [prices, setPrices] = useState<PriceMap>({})
  const [flash, setFlash] = useState<FlashMap>({})
  const latestPrices = useRef<PriceMap>({})
  const prevPrices = useRef<PriceMap>({})
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (pairs.length === 0) return

    const streams = pairs.map(p => `${p.toLowerCase()}@trade`).join('/')
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`)
    wsRef.current = ws

    ws.onmessage = event => {
      const data = JSON.parse(event.data)
      const pair = data.stream.replace('@trade', '')
      const price = parseFloat(data.data.p)
      latestPrices.current = { ...latestPrices.current, [pair]: price }
    }

    const interval = setInterval(() => {
      if (Object.keys(latestPrices.current).length > 0) {
        const newPrices = { ...latestPrices.current }
        const newFlash: FlashMap = {}

        pairs.forEach(pair => {
          const lowerPair = pair.toLowerCase()
          const prev = prevPrices.current[lowerPair]
          const next = newPrices[lowerPair]
          if (prev !== undefined && next !== undefined) {
            if (next > prev) newFlash[lowerPair] = 'green'
            else if (next < prev) newFlash[lowerPair] = 'red'
          }
        })

        setPrices(newPrices)

        setFlash(prev => ({ ...prev, ...newFlash }))

        Object.keys(newFlash).forEach(p => {
          setTimeout(() => {
            setFlash(prev => ({ ...prev, [p]: null }))
          }, 1000)
        })

        prevPrices.current = newPrices
      }
    }, intervalMs)

    return () => {
      ws.close()
      clearInterval(interval)
    }
  }, [pairs, intervalMs])

  return { prices, flash }
}
