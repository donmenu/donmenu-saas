import Image from "next/image";

export default function Blog(){
    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                <div className="mt-8 text-center text-base text-gray-400">
                    <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
                    <p className="mt-4 text-lg text-gray-500">Em breve...</p>
                    <section>
                    <Image
                        src="/images/diet.svg"
                        alt="Picture of the author"
                        placeholder="blur"
                        blurDataURL="/images/diet.svg"
                        width={400}
                        height={400}
                    />
                    </section>
                </div>
            </div>
        </div>
    )
}