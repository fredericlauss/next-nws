import BeerList from "@/components/beerList";

export default function BeersPage() {
  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Our Beer Selection</h1>
      <BeerList />
    </main>
  )
} 