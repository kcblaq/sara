import Link from "next/link";
import FilledButton from "../FilledButton";
import Nav from "./nav/Nav";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="w-full">
     <div className="top-0 left-0 fixed w-full">
     <Nav />
     <hr className="w-full" />
     </div>
     <section className=" h-screen pt-32 p-2 flex flex-col items-center justify-center gap-8 bg-secondary">
        <div className=" flex flex-col gap-4">
          <h2 className="2xl:text-6xl md:text-4xl text-lg text-center font-semibold ">
          Unlock your website's full potential with intelligent SEO solutions
          </h2>
          <p className=" 2xl:text-3xl text-lg md:text-2xl text-center font-normal">Transform your online presence, boost traffic, and outrank competitors with our advanced SEO services.</p>
        </div>
       <Link href={`/signup`} className="bg-primary text-white p-2 px-3 rounded-md text-lg">Get started for free </Link>
       <div className="flex h-full ">
            <Image alt="Macbook" className="" src={`/mac.png`} width={600} height={20 } />
       </div>
     </section>
     <section className="h-screen flex items-center justify-center bg-green-500">
features
     </section>
     <section className="h-screen flex items-center justify-center bg-green-300">
Why use webmaxi
     </section>
     <section className="h-screen flex items-center justify-center bg-green-100">
Explore our SEO power house
     </section>
     <section className="h-screen flex items-center justify-center bg-green-100">
Explore our SEO power house
     </section>
     <section className="h-screen flex items-center justify-center bg-green-200">
FAQ
     </section>
     <section className="h-[50vh] flex items-center justify-center bg-blue-200">
Still have questions?
     </section>
     <section className="h-[437px] flex items-center justify-center bg-primary text-white">
Footer
     </section>
     
    </main>
  )
}
