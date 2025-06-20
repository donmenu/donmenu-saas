import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="relative flex items-center justify-center">
        {/* Animação de pulso */}
        <div className="absolute h-24 w-24 rounded-full bg-green-500/20 animate-ping"></div>
        <div className="absolute h-36 w-36 rounded-full bg-green-500/10 animate-ping delay-150"></div>
        
        {/* Logo */}
        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg">
          <Image
            src="/images/logo.svg" 
            alt="Carregando..."
            width={48}
            height={48}
            priority
          />
        </div>
      </div>
      <p className="mt-8 text-lg font-medium text-gray-700 dark:text-gray-300">
        Carregando...
      </p>
    </div>
  );
} 