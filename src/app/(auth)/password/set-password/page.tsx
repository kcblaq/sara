'use client'
import PasswordInputComponent from "@/app/component/PasswordInputComponent";
import TitleAndDescription from "../../../component/TitleAndDescription";
import { useState } from "react";
import FilledButton from "@/app/component/FilledButton";
import BackToLogin from "../BackToLogin";


export default function SetPassword() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    console.log(password)
    return (
        <main className="w-full flex flex-col justify-center items-center gap-4 ">
            <TitleAndDescription title="Set new password" description="Your new password must be different from previously used password" />
            <main className="w-full flex flex-col gap-4">
                <div className="flex flex-col">
                    <label className=" font-semibold"> Password</label>
                    <PasswordInputComponent value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col">
                    <label className=" font-semibold">Confirm password</label>
                    <PasswordInputComponent value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <p className=""> Must be at least 8 characters </p>
                </div>
                <FilledButton title="Reset password" handleClick={() => console.log('Hellow')} />
                <BackToLogin />
            </main>
        </main>
    )
}