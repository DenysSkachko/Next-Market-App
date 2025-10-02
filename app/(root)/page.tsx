import SelectedCard from '@/components/cards/SelectedCard'
import { MarkedListed } from '@/components/shared/MarkedListed'
import TopCryptocurrencyList from '@/components/shared/TopCryptocurrencyList'

export default function Home() {
  return (
    <div className="flex min-h-screen text-gray-400 flex-col gap-4 md:gap-10 items-center sm:items-start">
      <MarkedListed />
      <section className="grid w-full gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <TopCryptocurrencyList />
        <SelectedCard />
      </section>
    </div>
  )
}
