'use client'

import useSWR from 'swr'

interface Beer {
  id: number
  name: string
  price: string
  rating: {
    average: number
    reviews: number
  }
  image: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function BeerList() {
  const { data: beers, error, isLoading } = useSWR<Beer[]>(
    'https://api.sampleapis.com/beers/ale',
    fetcher
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {beers?.map((beer) => (
        <div key={beer.id} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-2">{beer.name}</h2>
          <p className="text-gray-600 mb-2">{beer.price}</p>
        </div>
      ))}
    </div>
  )
}