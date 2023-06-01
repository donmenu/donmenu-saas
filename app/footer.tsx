export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                    <div className="px-5 py-2">
                        <a href="/sobre" className="text-base text-gray-500 hover:text-gray-900">
                            Sobre
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="/blog" className="text-base text-gray-500 hover:text-gray-900">
                            Blog
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="/faq" className="text-base text-gray-500 hover:text-gray-900">
                            Ajuda
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="/api" className="text-base text-gray-500 hover:text-gray-900">
                            API
                        </a>
                    </div>
                    <div className="px-5 py-2">
                        <a href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                            Privacidade
                        </a>
                    </div>                    
                </nav>
                <p className="mt-8 text-center text-base text-gray-400">&copy; 2021 Don Menu. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

