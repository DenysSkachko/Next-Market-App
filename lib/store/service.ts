import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CRYPTOCURRENCY_LIST } from '../constants'

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3',
  }),
  endpoints: (build) => ({
    getPrices: build.query<Record<string, { usd: number }>, void>({
      query: () =>
        `/simple/price?ids=${CRYPTOCURRENCY_LIST.join(',')}&vs_currencies=usd`,
      keepUnusedDataFor: 30,
    }),
  }),
})

export const { useGetPricesQuery } = cryptoApi
