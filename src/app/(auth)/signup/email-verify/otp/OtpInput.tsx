import FilledButton from '@/app/component/FilledButton';
import { AxiosInstance } from '@/lib/axios';
import { setToken, setUser } from '@/redux/features/userSlice';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';


const OtpInput: React.FC = () => {
  const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Set initial focus on the first input field when the component mounts
    inputRefs[0]?.current?.focus();
  }, []);

  const handleInput = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    }

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs[index + 1].current?.focus();
    } else if ((e.key === 'ArrowLeft' && index > 0) || (e.key === 'Backspace' && !value)) {
      inputRefs[index - 1].current?.focus();
    }

    const newOtpValues = [...otpValues];
    if (e.key !== 'Backspace') {
      newOtpValues[index] = value;
    }
    setOtpValues(newOtpValues);
  };
const dispatch = useDispatch()
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);

    // Distribute each character from pastedData to the corresponding input field
    const newOtpValues = Array(6).fill('').map((_, index) => pastedData[index] || '');
    setOtpValues(newOtpValues);
  };

  const token = localStorage.getItem('token');
  const router = useRouter()
  
  
  const route = useRouter()
  const userEmail = localStorage.getItem("userEmail")
  const payload = {
    email: userEmail,
    otp: parseInt(otpValues.join(""),10)
  }

 
  
 async function VerifyEmail(){
   console.log(JSON.stringify(token))
   setLoading(true)
   try{
   
    await AxiosInstance.post('/auth/verify-otp', payload)
     .then((res) => {
      if(res.status == 200){
        console.log("RES::",res.data.token)
        dispatch(setUser(res.data.user))
        dispatch(setToken(res.data.token))
            router.push('/dashboard')
      }
     })
     .then(()=> console.log('Submitted!'))
   }
   catch(err){
    console.log(err)
   }
   setLoading(false)
  }
 
  return (
    <div className="flex space-x-2 flex-col gap-4 w-full">
      <div className='flex space-x-2 justify-center '>
      {Array.from({ length: 4 }, (_, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          onChange={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          value={otpValues[index]}
          className="w-10 h-10 text-center border rounded-md focus:outline-none focus:shadow focus:shadow-primary"
        />
      ))}
      </div>
      <FilledButton loading={loading} title='Verify email' handleClick={VerifyEmail} />
    </div>
  );
};

export default OtpInput;


