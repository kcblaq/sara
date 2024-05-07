"use client"
import BackToLogin from "../BackToLogin";
import TitleAndDescription from "../../../component/TitleAndDescription";
import FilledButton from "@/app/component/FilledButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function EmailSent(){
    const userEmail = useSelector((state:RootState)=> state.user.user.email);
    const route = useRouter()
    const dispatch = useDispatch()
    
    async function handleSubmit() {
        try {
            const res = await axios.post('https://api.webmaxi.net/api/auth/forgot-password', {
                email: userEmail
            });
        } catch (error: any) {
            console.error('Error submitting form:', error);
        }
    }
    return (
        <main className="flex flex-col gap-8 ">
            <TitleAndDescription title="Check your email" description={`We set a password reset link to ${userEmail}`} />
            {/* <button className=" bg-purple-700 rounded-md font-semibold text-white w-full p-2">
                Open email app
            </button> */}
            <FilledButton title="Open email app" />
            <p> Didn't recieve the email? <span className=" text-purple-700 cursor-pointer" onClick={handleSubmit}> Click to resend</span></p>

            <BackToLogin/>
        </main>
    )
}