import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";


export default function Nav() {
  return (
    <main className="w-full justify-between flex items-center h-[72px] bg-secondary p-2 ">
      <div className=" items-center h-full gap-6 flex w-full">
        <Link href={`/`}>

          <Image src={`/logo 3.png`} alt="Webmaxi Logo" width={200} height={0} className="hidden lg:flex" />
          <Image src={`/mobile-logo.png`} alt="Webmaxi Logo" width={20} height={0} className="flex lg:hidden" />
        </Link>
        <Link href="/" className="text-lg font-semibold"> Home</Link>
        <span  className="text-lg cursor-pointer flex items-center font-semibold gap-1"> Features <IoIosArrowDown/> </span>
        <span  className="text-lg cursor-pointer flex items-center font-semibold gap-1"> Resources <IoIosArrowDown/> </span>
        <span  className="text-lg cursor-pointer flex items-center font-semibold gap-1"> Pricing </span>
      </div>
      <div className=" items-center justify-end h-full gap-6 flex w-full">
      <Link href={`login`} className=" text-lg font-semibold"> Login </Link>
      <Link href={`/signup`} className=" bg-primary font-semibold px-2 p-1 rounded-md text-white text-lg">Sign up </Link>
      </div>
    </main>
  )
}
