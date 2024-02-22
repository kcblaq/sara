
import React from 'react'
interface ButtonProps {
title: string;
handleClick?: ()=> void;
}
export default function FilledButton({title, handleClick}: ButtonProps) {
  return (
    <button className='w-full rounded-md p-3 bg-primary text-white font-semibold' onClick={handleClick}>
        {title}
    </button>
  )
}
