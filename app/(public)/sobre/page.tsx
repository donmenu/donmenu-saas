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
            <p className="mt-4 text-lg text-gray-500">
              Em 2021, Wellington Patriota decidiu abrir um restaurante. Utilizando um aplicativo de delivery para gerenciar os pedidos, ele enfrentou dificuldades para encontrar o preço certo a ser cobrado dos clientes, afetando a lucratividade do negócio.
            </p>
            <div className="flex justify-center md:justify-start items-center mt-4">
              <Image
                src="/images/somar.svg"
                alt="Picture of the author"
                className="w-20 h-20 rounded-full"
                width={400}
                height={400}
              />
              <p className="ml-2 text-lg text-gray-500">
                Sua ideia foi registrada para a competição Programa Somar em São Paulo, promovida pela aceleradora de startups b2Mamy. Entre 100 empreendedores, Wellington ficou em segundo lugar, recebendo investimento e mentoria para transformar sua visão em realidade.
              </p>
            </div>
            <p className="mt-4 text-lg text-gray-500">
              O Don Menu é uma plataforma que capacita restaurantes de pequeno e médio porte no Brasil, fornecendo assistência precisa em orçamentação e precificação. Através do Don Menu, os restaurantes têm as informações necessárias para evitar armadilhas financeiras e prosperar no competitivo cenário culinário.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center mt-8 text-center text-base text-gray-400">
          <div className="md:w-1/2">
            <Image
              src="/images/chef.svg"
              alt="Picture of the author"
              className="w-60 h-60 rounded-full mx-auto md:mx-0"
                width={240}
                height={240}
            />
          </div>
          <div className="md:w-1/2">
            <p className="mt-4 text-lg text-gray-500">
              Assista à apresentação da ideia no vídeo abaixo:
            </p>
            <div className="w-full h-0 relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://www.youtube.com/embed/fK3zLS9cFg0"
                title="YouTube video player"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
            <p className="mt-4 text-lg text-gray-500">
              O momento em que Wellington recebe o prêmio pode ser encontrado a partir de 3:20:00 até 3:23:07 no vídeo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


