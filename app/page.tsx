import Image from "next/image";

export default function IndexPage() {
  return (
    <div className="bg-gradient">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
      <video
            className="absolute left-0 top-0 w-full h-full object-cover z-[-1]"
            src="/videos/back-video.mp4"
            autoPlay
            loop
            muted
            style={{ opacity: 0.8 }}
          />
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">          
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(/images/logo.svg)" fillOpacity="0.7" />
            <circle cx={512} cy={512} r={512} fill="url(/images/logo.svg)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            
          <div className="flex items-center">
            <div className="relative">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-3xl font-montserrat">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Precificar não é mais</span> um problema
              </h1>
              <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2">
                <Image
                  className="w-8 h-8 rounded-full bg-white/5 shadow-sm"
                  src="/images/logo.svg"
                  alt="logo do app"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </div>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Uma solução simples e intuitiva para a gestão de cardápios e precificação de produtos.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <a
              href="/welcome"
              className="rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-pink-500 hover:to-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Conheça agora!
          </a>
  

</div>

          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <Image
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="/images/paneldashboard.svg"
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>

          
        </div>
      </div>
    </div>
  )
}
