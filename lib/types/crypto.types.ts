export interface CryptocurrencyBasic {
  id: string
  symbol: string
  name: string
  image: string
  current_price?: number
}

export interface Cryptocurrency extends CryptocurrencyBasic {
  market_cap?: number
  market_cap_rank?: number
  total_volume?: number
  total_supply?: number
  high_24h?: number
  low_24h?: number
  price_change_percentage_24h?: number
}

export interface CryptoState {
  lists: {
    top: Cryptocurrency[]
    marked: Cryptocurrency[]
    all: Cryptocurrency[]
  }
  globals: any
  selectedCoinId: string | null
  status: 'idle' | 'loading' | 'failed'
  searchTerm: string
}

export interface CoinsList {
  ids: string[]
  listKey: 'top' | 'marked' | 'all'
}
