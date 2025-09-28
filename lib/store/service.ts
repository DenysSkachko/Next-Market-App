import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CRYPTOCURRENCY_LIST } from '../constants'

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: build => ({
    getPrices: build.query<Record<string, { usd: number }>, void>({
      query: () => `/prices?ids=${CRYPTOCURRENCY_LIST.join(',')}`,
    }),
  }),
})

export const { useGetPricesQuery } = cryptoApi
