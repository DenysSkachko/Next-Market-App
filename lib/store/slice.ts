import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CoinsList, Cryptocurrency, CryptoState } from '../types/crypto.types'

const initialState: CryptoState = {
  lists: {
    top: [],
    marked: [],
    all: [],
  },
  globals: null,
  selectedCoinId: 'bitcoin',
  status: 'idle',
  searchTerm: '',
}

export const fetchCoins = createAsyncThunk(
  'crypto/fetchCoins',
  async ({ ids, listKey }: CoinsList) => {
    let url: string

    if (listKey === 'all') {
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&price_change_percentage=24h`
    } else {
      url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(
        ','
      )}&order=market_cap_desc&price_change_percentage=24h`
    }

    const res = await fetch(url)
    const data = (await res.json()) as Cryptocurrency[]
    return { listKey, data }
  }
)

export const fetchGlobals = createAsyncThunk('crypto/fetchGlobals', async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/global')
  const json = await res.json()
  return json.data
})

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    selectCoin: (state, action: PayloadAction<string>) => {
      state.selectedCoinId = action.payload
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCoins.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        const { listKey, data } = action.payload
        state.status = 'idle'
        state.lists[listKey] = data
      })
      .addCase(fetchCoins.rejected, state => {
        state.status = 'failed'
      })
      .addCase(fetchGlobals.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchGlobals.fulfilled, (state, action) => {
        state.status = 'idle'
        state.globals = action.payload
      })
      .addCase(fetchGlobals.rejected, state => {
        state.status = 'failed'
      })
  },
})

export const { selectCoin } = cryptoSlice.actions
export const { setSearchTerm } = cryptoSlice.actions

export default cryptoSlice.reducer
