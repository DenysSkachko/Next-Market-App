import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CoinsList, Cryptocurrency, CryptoState } from '../types/crypto.types'

const initialState: CryptoState = {
  coins: [],
  selectedCoinId: null,
  status: 'idle',
}

export const fetchCoins = createAsyncThunk('crypto/fetchCoins', async (payload: CoinsList) => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${payload.ids.join(
      ','
    )}&order=market_cap_desc`
  )
  return (await res.json()) as Cryptocurrency[]
})

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    selectCoin: (state, action: PayloadAction<string>) => {
      state.selectedCoinId = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCoins.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = 'idle'
        state.coins = action.payload
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = 'failed'
      })
  },
})

export const { selectCoin } = cryptoSlice.actions

export default cryptoSlice.reducer
