import { configureStore } from '@reduxjs/toolkit'
import cryptoReducer from './slice'
import { cryptoApi } from './service'

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cryptoApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
