import { currentYear } from "@/app/utils/currenYear";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import Image from "next/image";
import { Metadata } from "next";

type PasswordProps = {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: ` Webmaxi | Verify Email`,
    description: "Webmaxi Signup page",
  };

export default function ForgetPassword({ children }: PasswordProps) {
    return (
        <main className=" w-full h-screen p-4 flex flex-col gap-10 justify-between ">

            <div className=" flex flex-col gap-14">
                <Link href={`/`}>
                <Image src={`/logo.png`} alt="Webmaxi Logo" width={145} height={24} className="" />
                    {/* <Image src={`/logo 3.png`} alt="Webmaxi Logo" width={200} height={0} className="hidden lg:flex" />
                    <Image src={`/mobile-logo.png`} alt="Webmaxi Logo" width={20} height={0} className="flex lg:hidden" /> */}
                </Link>
                <section className="w-full justify-between flex flex-col gap-2">
                    <div className=" h-full  flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center gap-4 max-w-[300px]">
                            <div className="flex items-center justify-center">
                                <Image src={`/email.png`} alt="Webmaxi password key" width={56} height={56} />
                            </div>
                            
                            <div className="flex flex-col w-full">
                                {children}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <footer className="lg:flex justify-between w-full items-center hidden ">
                <small className=""> &#169;Webmaxi {currentYear()}.</small>
                <small className="flex items-center gap-1"> <CiMail /> help@webmaxi.net</small>
            </footer>


        </main>
    )
}