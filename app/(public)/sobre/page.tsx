import localImage from "/images/chef.svg";
import Image from "next/image";


export default function SobrePage() {
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <div className="mt-8 text-center text-base text-gray-400">
                    <h1 className="text-3xl font-bold text-gray-900">Sobre</h1>
                    <p className="mt-4 text-lg text-gray-500">O Orçamento Inteligente é um aplicativo web que ajuda você a controlar suas finanças pessoais.</p>
                    <section>
                    <Image
                        src={"/images/chef.svg"}
                        alt="Picture of the author"
                        placeholder="blur"
                        blurDataURL="/images/chef.svg"
                        width={500}
                        height={500}
                    />
                    </section>

                </div>
            </div>
        </div>
    )
}




