import { Suspense } from 'react'
import BeerList from "@/components/beerList"
import Spinner from "@/components/spinner"


async function getBeers() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const res = await fetch('https://api.sampleapis.com/beers/ale')

  if (!res.ok) {
    throw new Error('Failed to fetch beers')
  }

  return res.json()
}

export default function BeersPage() {
  const beersData = getBeers()

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Our Beer Selection</h1>
      <Suspense fallback={<Spinner />}>
        <BeerList beers={beersData} />
      </Suspense>
    </main>
  )
} 