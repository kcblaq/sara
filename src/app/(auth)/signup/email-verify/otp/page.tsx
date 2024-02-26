'use client'
import BackToLogin from '@/app/(auth)/password/BackToLogin'
import FilledButton from '@/app/component/FilledButton'
import TitleAndDescription from '@/app/component/TitleAndDescription'
import React from 'react'
import OtpInput from './OtpInput'

export default function page() {
  const email = localStorage.getItem("userEmail")
  const desc =  <span> We sent an OTP code to <b>{email} </b> </span>
  return (
    <main className="w-full flex flex-col justify-center items-center gap-4 ">
        <TitleAndDescription title='Check your email' description={desc} />
        <OtpInput/>
        <BackToLogin />
    </main>
  )
}
