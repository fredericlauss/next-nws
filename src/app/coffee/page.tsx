
interface Coffee {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  price: number;
}

async function getCoffees() {
  const res = await fetch('https://api.sampleapis.com/coffee/hot', {
    next: {
      revalidate: 3600
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch coffees');
  }

  return res.json() as Promise<Coffee[]>;
}

export default async function CoffeePage() {
  const coffees = await getCoffees();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Nos Cafés</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coffees.map((coffee: Coffee) => (
          <div 
            key={coffee.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{coffee.title}</h2>
                <span className="text-green-600 font-bold">
                  {coffee.price.toFixed(2)} €
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">
                {coffee.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {coffee.ingredients.map((ingredient: string, index: number) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-sm rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 