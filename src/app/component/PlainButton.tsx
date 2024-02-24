
import React from 'react'
interface ButtonProps {
title: string;
handleClick?: ()=> void;
}
export default function PlainButton({title, handleClick}: ButtonProps) {
  return (
    <button className='w-full border rounded-lg text-base p-3 text-[#344054] font-semibold' onClick={handleClick}>
        {title}
    </button>
  )
}
