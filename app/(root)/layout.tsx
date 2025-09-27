import Header from '@/components/shared/Header'
import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8">{children}</div>
    </main>
  )
}

export default MainLayout
