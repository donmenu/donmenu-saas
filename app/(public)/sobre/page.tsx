import localImage from "/images/chef.svg";
import Image from "next/image";


export default function SobrePage() {
    return (
        <div className="bg-white">
    <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center mt-8 text-center text-base text-gray-400">
            <div className="md:w-1/2">
                <video src="/videos/video.mov" controls width={400} height={400} autoPlay>
                    Desculpe, seu navegador não suporta vídeos HTML5.
                </video>
            </div>
            <div className="md:w-1/2">
                <h1 className="text-3xl font-bold text-gray-900">Como surgiu</h1>
                <p className="mt-4 text-lg text-gray-500">                    
                    Em 2021, Wellington Patriota, como muitos outros brasileiros, decidiu se aventurar e abrir um restaurante. 
                    Ele iniciou seu negócio em casa e decidiu utilizar um aplicativo de delivery para ajudá-lo a gerenciar os pedidos. 
                    Infelizmente, ele logo percebeu o quão difícil era realmente obter lucro, pois lutava para encontrar o preço certo a ser cobrado dos clientes.
                </p>
                <Image
                        src={"/images/somar.svg"}
                        alt="Picture of the author"
                        placeholder="blur"
                        blurDataURL="/images/somar.svg"
                        width={300}
                        height={300}
                />
                <p className="mt-4 text-lg text-gray-500">
                    Então, ele fez o que qualquer pessoa faria nessa situação: pesquisou no Google como resolver o problema e, para sua surpresa, não encontrou um aplicativo que calculasse o preço ideal para cada item do seu cardápio. 
                    Foi então que teve a ideia de criar o Don Menu: uma plataforma que capacita restaurantes de pequeno e médio porte no Brasil, fornecendo assistência precisa em orçamentação e precificação, garantindo que tenham as informações necessárias para evitar armadilhas financeiras e prosperar no competitivo cenário culinário.
                    Mesmo tendo que desistir do restaurante, ele registrou sua ideia para uma competição em São Paulo, chamada Programa Somar pela aceleradora de startups b2Mamy. 
                    Ele competiu com outros 100 empreendedores.                     
                </p>
                <p className="mt-4 text-lg text-gray-500"> 
                    <Image
                        src={"/images/somar.svg"}
                        alt="Picture of the author"
                        placeholder="blur"
                        blurDataURL="/images/somar.svg"
                        width={300}
                        height={300}
                    />
                    Sua ideia ficou em segundo lugar e foi avaliada pelos parceiros para verificar sua viabilidade e impacto na comunidade-alvo. 
                    Reconhecendo o potencial do Don Menu, Wellington recebeu o investimento e a mentoria necessários para transformar sua visão em realidade.
                </p>
            </div>                        
        </div>
        <div className="flex flex-col md:flex-row items-center mt-8 text-center text-base text-gray-400">
            <div className="md:w-1/2">
                <Image
                    src={"/images/chef.svg"}
                    alt="Picture of the author"
                    placeholder="blur"
                    blurDataURL="/images/chef.svg"
                    width={300}
                    height={300}
                />
            </div>
            <div className="md:w-1/2">
                <p className="mt-4 text-lg text-gray-500">                    
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/fK3zLS9cFg0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    Assista à apresentação da sua ideia: inicie em 1:53:46 até 2:05:10.<br />
                    O momento em que ele recebe o prêmio: inicie em 3:20:00 até 3:23:07.
                </p>
            </div>
            
        </div>
    </div>
</div>

    )
}




