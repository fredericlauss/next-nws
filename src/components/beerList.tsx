'use client'

import { use } from 'react'

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

export default function BeerList({ beers }: { beers: Promise<Beer[]> }) {
  const beerData = use(beers)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {beerData.map((beer) => (
        <div key={beer.id} className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-2">{beer.name}</h2>
          <p className="text-gray-600 mb-2">{beer.price}</p>
        </div>
      ))}
    </div>
  )
}