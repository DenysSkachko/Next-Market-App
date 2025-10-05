'use client'

import React from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useStore'
import { setSearchTerm } from '@/lib/store/slice'

const Header = () => {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(state => state.crypto.searchTerm)

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="flex justify-between mx-auto max-w-screen-2xl h-full relative px-4 md:px-6 lg:px-8 my-4">
        <input
          type="text"
          placeholder="Search market"
          value={searchTerm}
          onChange={e => dispatch(setSearchTerm(e.target.value))}
          className="text-[#666873] py-3 px-4 border border-[#303241] rounded-xl w-100 h-12.5 flex items-center outline-none"
        />
        <h2 className="text-[30px] text-yellow-400 font-semibold tracking-wider">
          Proxima<span className="text-[21px] text-white font-bold">Crypto</span>
        </h2>
      </div>
    </div>
  )
}

export default Header
