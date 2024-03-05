"use client";

import { useState } from "react";
import { FaAnglesLeft } from "react-icons/fa6";
import Nav from "../component/home/nav/Nav";
import FilledButton from "../component/FilledButton";
import PlainButton from "../component/PlainButton";
import { CiShare2 } from "react-icons/ci";




export default function Dashboard() {
  const [fullWidth, setFullWidth] = useState(true);

  return (
    <>
    
      <hr className="w-full shadow" />
      <main className={`h-screen w-screen flex`}>
        <section
          style={{ width: fullWidth ? "200px" : "80px" }}
          className={`bg-purple-700 hidden lg:flex h-screen relative transition-all duration-300 ease-in-out`}
        >
          <div className="absolute -right-4 top-20 p-2 border bg-white shadow rounded-lg cursor-pointer" onClick={() => setFullWidth(!fullWidth)}>
            <FaAnglesLeft className={`${!fullWidth && 'scale-x-[-1]'} duration-300 transition-all ease-out`} />
          </div>
          Hello
        </section>
        <section className={`w-full p-2`}>
          <div className="flex w-full gap-2 justify-between items-center">
            <div className="flex w-full lg:w-1/2 gap-2 items-center justify-between">
              <select className=" w-full p-3 rounded-md border shadow">
                <option className=""> www.google.com </option>
                <option className=""> www.freefoods.com </option>
                <option className=""> www.ecommerce.com </option>
              </select>
              <div><FilledButton title="+" /></div>
            </div>
            <div className="lg:flex w-1/2 justify-end hidden">
              upgrade
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2  p-2 w-full">
            <div className="grid w-full grid-cols-1">
              <h1 className=" text-2xl text-[#101828] font-semibold"> Welcome back, John</h1>
              <p className="">Track, manage and boost your site’s SEO.</p>
            </div>
            <div className=" w-full flex items-center gap-2   ">
              <span className="">
                <button className='w-full gap-4 border rounded-lg text-base p-3 flex items-center text-[#344054] font-semibold'>
                  <CiShare2 /> Share
                </button>
              </span>
              <FilledButton title="View recomendations" />
            </div>
          </div>

        </section>
      </main>
    </>
  );
}
