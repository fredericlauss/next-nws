import Image from 'next/image';
import map from '../../public/generate-map.png';

export default function Home() {
  return (
    <div className="prose max-w-none">
      <h1>Accueil</h1>
      <p>Bienvenue sur notre site!</p>
      
      <div className="relative w-1/4 aspect-[4/3] my-4">
        <Image
          src={map}
          alt="Carte du monde"
          fill
          priority
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
}
