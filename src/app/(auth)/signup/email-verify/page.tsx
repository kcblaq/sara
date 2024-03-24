'use client'
import TitleAndDescription from '../../../component/TitleAndDescription'
import FilledButton from '@/app/component/FilledButton'
import BackToLogin from '../../password/BackToLogin'

export default function page() {
  const email = localStorage.getItem('userEmail')
  return (
    <main className="w-full flex flex-col justify-center items-center gap-4 ">

        <TitleAndDescription title='Check your email' description={`We sent a verification link to ${email}`}/>
        <FilledButton title='Enter code manually' handleClick={()=> console.log('Hey')} />
        <BackToLogin/>
    </main>
    
  )
}
