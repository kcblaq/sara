
import React from 'react'
interface ButtonProps {
title: string;
handleClick?: ()=> void;
icon?: React.ReactNode
}
export default function FilledButton({title, handleClick, icon}: ButtonProps) {
  return (
    <button className='w-full flex gap-2 items-center rounded-lg text-base px-5 p-2 bg-primary text-white font-semibold hover:bg-blue-500' onClick={handleClick}>
       {icon} {title}
    </button>
  )
}

interface ButtonFilledProps {
  title: string;
  handleClick: ()=> void;
}
export  function ButtonFilled({title, handleClick}: ButtonFilledProps) {
  return (
    <button className='w-full rounded-lg text-base px-5 p-2 bg-primary text-white font-semibold hover:bg-blue-500' onClick={handleClick}>
        {title}
    </button>
  )
}
