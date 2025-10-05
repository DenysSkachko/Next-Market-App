'use client'

import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { fetchCoins } from '@/lib/store/slice'
import { Cryptocurrency } from '@/lib/types/crypto.types'
import RowCard from '../cards/RowCard'
import { Pagination } from './Pagination'

const ITEMS_PER_PAGE = 10

const AllCryptocurrencyList = () => {
  const dispatch = useAppDispatch()
  const { lists, status, searchTerm } = useAppSelector(state => state.crypto)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (!lists.all || lists.all.length === 0) {
      dispatch(fetchCoins({ ids: [], listKey: 'all' }))
    }
  }, [dispatch, lists.all])

  if (status === 'loading') return <p>Loading...</p>
  if (status === 'failed') return <p>Error...</p>

  const filteredCoins = lists.all.filter((coin: Cryptocurrency) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCoins.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentCoins = filteredCoins.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <div>
      <ul className="border border-[#303241] rounded-xl overflow-hidden">
        {currentCoins.map((coin: Cryptocurrency) => (
          <RowCard key={coin.id} coin={coin} />
        ))}
        {currentCoins.length === 0 && (
          <li className="p-6 text-center text-gray-400">No results found</li>
        )}
      </ul>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default AllCryptocurrencyList
