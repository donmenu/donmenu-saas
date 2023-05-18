export const metadata = {
    title: 'Don Menu',
    description:
      'Don Menu é um sistema de cardápio digital para restaurantes, bares e lanchonetes.'
  };
  
  function Index({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="flex flex-no-wrap">
            {/* Sidebar starts */}
            {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
            <div className="w-64 absolute sm:relative bg-gray-800 shadow md:h-full flex-col justify-between flex">
                <div className="px-8">                    
                    <ul className="mt-12">
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">                                
                                <span className="text-sm  ml-2">Dashboard</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">                                
                                <a href="/dashboard/cardapio" className="text-sm  ml-2">
                                    <span className="text-sm  ml-2">Produtos</span>
                                </a>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">                                
                                <span className="text-sm  ml-2">Performance</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">                                
                                <span className="text-sm  ml-2">Delivery</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">                                
                                <span className="text-sm  ml-2">Pedidos</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">                                
                                <span className="text-sm  ml-2">Inventario</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center">
                            <a href="/dashboard/users" className="flex items-center">
                                <div className="flex items-center">                                
                                    <span className="text-sm  ml-2">Usuários</span>
                                </div>
                            </a>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center">
                            <a href="/dashboard/settings" className="flex items-center">
                                <div className="flex items-center">                                
                                    <span className="text-sm  ml-2">Configurações</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="flex justify-center mt-48 mb-4 w-full">
                        <div className="relative ">
                            <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">                                
                            </div>
                            <input className=" bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2" type="text" placeholder="Busca" />
                        </div>
                    </div>
                </div>
                <div className="px-8 border-t border-gray-700">
                    <ul className="w-full flex items-center justify-between bg-gray-800">
                        <li className="cursor-pointer text-white pt-5 pb-3">                            
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-64 z-40 absolute bg-gray-800 shadow md:h-full flex-col justify-between sm:hidden  transition duration-150 ease-in-out" id="mobile-nav">
                <div className="h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer" id="mobile-toggler" >
                    
                </div>
                <div className="px-8">
                    <div className="h-16 w-full flex items-center">
                        
                    </div>
                    <ul className="mt-12">
                        <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                
                                <span className="text-sm  ml-2">Dashboard</span>
                            </div>
                            <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">5</div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                
                                <span className="text-sm  ml-2">Produtos</span>
                            </div>
                            <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">8</div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                
                                <span className="text-sm  ml-2">Performance</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">
                                
                                <span className="text-sm  ml-2">Delivery</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">                                
                                <span className="text-sm  ml-2">Pedidos</span>
                            </div>
                            <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">25</div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center mb-6">
                            <div className="flex items-center">                                
                                <span className="text-sm  ml-2">Inventario</span>
                            </div>
                        </li>
                        <li className="flex w-full justify-between text-gray-600 hover:text-gray-500 cursor-pointer items-center">
                            <div className="flex items-center">
                                
                                <span className="text-sm  ml-2">Configurações</span>
                            </div>
                        </li>
                    </ul>
                    <div className="flex justify-center mt-48 mb-4 w-full">
                        <div className="relative ">
                            <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                
                            </div>
                            <input className=" bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2" type="text" placeholder="Busca" />
                        </div>
                    </div>
                </div>
                <div className="px-8 border-t border-gray-700">
                    <ul className="w-full flex items-center justify-between bg-gray-800">
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Index;
