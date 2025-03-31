'use client';

import dynamic from 'next/dynamic';
import errorAnimation from '../animations/404.json';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
      <div className="w-[300px] h-[300px] mb-8">
        <Lottie
          animationData={errorAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Oups ! Page non trouvée
      </h1>
      
      <p className="text-xl text-gray-600 mb-8">
        La page que vous recherchez semble avoir disparu dans l&apos;espace...
      </p>
      
    </div>
  );
} 