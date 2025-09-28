export interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  current_price?: number
  market_cap?: number
  image: string
}

export interface CryptoState {
  coins: Cryptocurrency[]
  selectedCoinId: string | null
  status: 'idle' | 'loading' | 'failed'
}

export interface CoinsList {
  ids: string[]
}
