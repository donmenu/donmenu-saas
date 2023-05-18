import Image from "next/image";

export default function Blog(){
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <div className="mt-8 text-center text-base text-gray-400 flex space-x-4">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="flex justify-center">
                            <Image
                                src="/images/diet.svg"
                                alt="Picture of the author"
                                placeholder="blur"
                                blurDataURL="/images/diet.svg"
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Como calcular corretamente</div>
                            <p className="text-gray-700 text-base">Saiba cada detalhe e aplique em seu estabelecimento!</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#precificacao</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#cardapio</span>                            
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="flex justify-center">
                            <Image
                                src="/images/eat.svg"
                                alt="Picture of the author"
                                placeholder="blur"
                                blurDataURL="/images/eat.svg"
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Como planejar promoções?</div>
                            <p className="text-gray-700 text-base">Saiba os truques dos grandes restaurantes</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#empreendedorismo</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#gastronomia</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#promocao</span>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="flex justify-center">
                            <Image
                                src="/images/chef.svg"
                                alt="Picture of the author"
                                placeholder="blur"
                                blurDataURL="/images/chef.svg"
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Conquistando clientes!</div>
                            <p className="text-gray-700 text-base">Vender é a alma do negócio. Fique por dentro!</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#vendas</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#cardapio</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#marketing</span>
                        </div>
                    </div>
                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                        <div className="flex justify-center">
                            <Image
                                src="/images/street.svg"
                                alt="Picture of the author"
                                placeholder="blur"
                                blurDataURL="/images/street.svg"
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">Aumento do número de pedidos delivery</div>
                            <p className="text-gray-700 text-base">Aumente sua receita com nossas dicas</p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#delivery</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#vendas</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#planejamento</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}