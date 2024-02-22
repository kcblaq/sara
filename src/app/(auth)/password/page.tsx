'use client'
import { currentYear } from "@/app/utils/currenYear";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";


export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    return (
        <main className=" w-full justify-center items-center flex gap-4 flex-col">
            <h1 className=" font-bold text-3xl">Forgot password? </h1>
            <p className="">No worries, we will send you instructions. </p>
            <div className="flex flex-col w-full">
                <label className=""> Email</label>
                <input className="p-2 border rounded-md focus:outline-purple-700 w-full" value={email} onChange={(e)=> setEmail(e.target.value)} />

            </div>
            <button className=" bg-purple-700 w-full rounded-md text-white p-2">
                Reset password
            </button>
           
            <Link href={`/login`} className="flex items-center gap-2">
            <FaArrowLeft />
                Back to login
            </Link>
        </main>
    )
}