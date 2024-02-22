import React, { useState } from 'react'
import { IoEyeOffOutline ,IoEyeOutline} from "react-icons/io5";
interface InputProps {
    value: string;
    onChange: (e:any)=> void;
}
export default function PasswordInputComponent({value, onChange}: InputProps) {
    const [isPassword, setIsPassword] = useState(true)
  return (
    <div className='relative w-full'>
        <input className='p-2 border w-full rounded-md focus:outline-purple-200  focus:border' type={isPassword ? 'password' : 'text'} value={value} onChange={onChange} />
        <button className='absolute right-2 top-3'> {
            isPassword ? <IoEyeOutline onClick={()=> setIsPassword(false)} /> : <IoEyeOffOutline onClick={()=> setIsPassword(true)} />
        } </button>
    </div>
  )
}
