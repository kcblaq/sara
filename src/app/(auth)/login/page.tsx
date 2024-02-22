
import { SignupComponent } from "@/app/(auth)/signup/SignupComponent";
import { LoginComponent } from "./LoginComponent";

export default function Signup() {
    return (
        <section className=" h-screen flex w-full justify-between">

            <div className="w-full lg:w-1/2 p-4 h-full">
                <main className=" w-full h-full  ">

                    <LoginComponent />



                </main>
            </div>
            <div className={`w-1/2 px-24 justify-center  flex-col items-start hidden lg:flex bg-[#7F56D9] rounded-tl-[80px] rounded-bl-[80px]`}
                style={{
                    backgroundImage: "url('/computer.png')",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right bottom",
                    backgroundBlendMode: 'multiply',
                    color: '#FFF',
                    // opacity: '10%'


                }}
            >
                <h2 className=" text-white text-5xl 2lg:text-6xl text-start font-semibold leading-tight"> Start winning your<br /> SEO game!</h2>
                <p className="mt-6 text-justify leading-normal"> Create your account and explore a range of automated features to boost your brand’s SEO. No complex tools. </p>
            </div>


        </section>
    )
}