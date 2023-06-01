import localImage from "/images/chef.svg";
import Image from "next/image";
import React from 'react';

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
          <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start">
          <h1 className="text-3xl font-bold text-gray-900 tracking-wide leading-tight mb-4">
            Como surgiu
        </h1>
        <p className="mt-4 text-lg text-gray-500 font-light tracking-wide">
          Em 2021, Wellington Patriota decidiu abrir um restaurante. Utilizando um aplicativo de delivery para gerenciar os pedidos, ele enfrentou dificuldades para encontrar o preço certo a ser cobrado dos clientes, o que impactou diretamente a lucratividade do negócio.
        </p>

        <div className="flex justify-center md:justify-start items-center mt-4 space-x-4">
          <div className="flex-shrink-0">
            <div className="bg-gray-200 rounded-full p-1">
              <Image
                src="/images/somar.svg"
                alt="Picture of the author"
                className="rounded-full"
                width={300}
                height={300}
              />
            </div>
          </div>
          <div className="text-gray-800">
            <p className="text-lg font-medium">
              Sua ideia foi registrada para o Programa de aceleração de empresas Somar em São Paulo, promovido pela aceleradora de startups B2Mammy. Entre 100 empreendedores, Wellington ficou em segundo lugar, recebendo investimento e mentoria para transformar sua visão em realidade.
            </p>
          </div>
        </div>
        <p className="mt-4 text-lg text-gray-500">
          O Don Menu é uma plataforma que capacita restaurantes de pequeno e médio porte no Brasil, fornecendo assistência precisa em orçamentação e precificação. Através do Don Menu, os restaurantes têm as informações necessárias para evitar armadilhas financeiras e prosperar no competitivo cenário culinário.
        </p>
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row items-center mt-8 text-center">
      
    <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg">
        <p className="text-lg text-gray-600 mb-4">
          A apresentação pode ser encontrada a partir de <span className="font-bold">1:00:00</span> até <span className="font-bold">1:03:00</span> no vídeo.
        </p>
        <p className="text-lg text-gray-600">
          O momento em que Wellington recebe o prêmio pode ser encontrado a partir de <span className="font-bold">3:20:00</span> até <span className="font-bold">3:23:07</span> no vídeo.
        </p>
      </div>

      
      <div className="md:w-1/2">
        <div className="bg-gray-100 rounded-lg p-4">
          
          <p className="text-lg text-gray-600">
            Assista à apresentação da ideia no vídeo abaixo:
          </p>
          <div className="w-full relative" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/fK3zLS9cFg0"
              title="YouTube video player"
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
          <Image
            src="/images/chef.svg"
            alt="Picture of the author"
            className="w-48 h-48 mx-auto mb-4"
            width={192}
            height={192}
          />
        </div>
      </div>

      


    </div>

  </div>
</div>
  );
};


