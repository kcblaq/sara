
import React from 'react'
interface ButtonProps {
title: string;
handleClick?: ()=> void;
}
export default function FilledButton({title, handleClick}: ButtonProps) {
  return (
    <button className='w-full rounded-lg text-base px-5 py-3 bg-primary text-white font-semibold hover:bg-blue-500' onClick={handleClick}>
        {title}
    </button>
  )
}

interface ButtonFilledProps {
  title: string;
  handleClick: ()=> void;
}
export  function ButtonFilled({title, handleClick}: ButtonFilledProps) {
  return (
    <button className='w-full rounded-lg text-base px-5 py-3 bg-primary text-white font-semibold hover:bg-blue-500' onClick={handleClick}>
        {title}
    </button>
  )
}
