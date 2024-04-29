
import React from 'react'
import Loader, { LoadingState } from './Loader';
import { BiLoader } from 'react-icons/bi';
interface ButtonProps {
title: string;
handleClick?: ()=> void;
loading?: boolean;
icon?: React.ReactNode
}
export default function FilledButton({title, handleClick, icon, loading}: ButtonProps) {
  
  return (
    <button className='w-full flex gap-2 items-center rounded-lg justify-center text-base px-5 p-3 cursor-pointer bg-primary text-white font-semibold hover:bg-blue-500' onClick={handleClick}>
       {icon} {title} { loading && <span className=''> {loading && <span> <BiLoader className="w-full  animate-spin text-white" /> </span> } </span>}
    </button>
  )
}

interface ButtonFilledProps {
  title: string;
  handleClick: ()=> void;
  loading?: boolean;
}
export  function ButtonFilled({title, handleClick, loading}: ButtonFilledProps) {
  return (
    <button disabled={loading} className={`w-full flex items-center gap-2 justify-center rounded-lg text-base px-5 p-2 bg-primary text-white font-semibold hover:bg-blue-500`} onClick={handleClick}>
        {title} {loading && <span> <BiLoader className="w-full  animate-spin text-white" /> </span> }
    </button>
  )
}
