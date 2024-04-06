
import React from 'react'
interface ButtonProps {
title: string;
handleClick?: ()=> void;
icon?: React.ReactNode;
moreClass?: string;
loading?: boolean
}
export default function PlainButton({title, handleClick,icon,moreClass}: ButtonProps) {
  return (
    <button className={`w-full items-center flex gap-1 justify-center border h-[40px] rounded-lg text-base p-2 text-[#344054] font-semibold hover:bg-gray-100 ${moreClass}`} onClick={handleClick}>
      {icon}  {title}
    </button>
  )
}
