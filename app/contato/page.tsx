export default function ContatoPage() {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <div className="mt-8 text-center text-base text-gray-400">
                    <h1 className="text-3xl font-bold text-gray-900">Contato</h1>
                    <form className="mt-4 text-lg text-gray-500">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                                Nome
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nome"
                                type="text"
                                placeholder="Nome"
                            />
                            </div>
                            <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input  
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                            />
                            </div>
                        </form>    
                </div>
            </div>
        </div>
    )
}
