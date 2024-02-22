import BackToLogin from "../BackToLogin";
import TitleAndDescription from "../../../component/TitleAndDescription";

export default function EmailSent(){
    return (
        <main className="flex flex-col gap-8 ">
            <TitleAndDescription title="Check your email" description="We set a password reset link to amaka@gmail.com" />
            <button className=" bg-purple-700 rounded-md font-semibold text-white w-full p-2">
                Open email app
            </button>
            <p> Didn't recieve the email? <span className=" text-purple-700 cursor-pointer"> Click to resend</span></p>

            <BackToLogin/>
        </main>
    )
}