import FilledButton from '@/app/component/FilledButton';
import TitleAndDescription from '@/app/component/TitleAndDescription';
import { useEffect, useState } from 'react';
import BackToLogin from '../../password/BackToLogin';

export default function page() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    setEmail(userEmail ?? '');
  }, []);

  return (
    <main className="w-full flex flex-col justify-center items-center gap-4 ">
      <TitleAndDescription title='Check your email' description={`We sent a verification link to ${email}`}/>
      <FilledButton title='Enter code manually' handleClick={()=> console.log('Hey')} />
      <BackToLogin/>
    </main>
  );
}