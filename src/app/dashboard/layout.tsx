'use client'
import React, { useState } from 'react'
import { BsLightningCharge } from 'react-icons/bs';
import { CiSearch, CiSettings, CiShare2 } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaAnglesLeft } from 'react-icons/fa6';
import { IoMdMenu, IoMdNotificationsOutline } from 'react-icons/io';
import FilledButton from '../component/FilledButton';
import Image from 'next/image';
import { RxDashboard, RxDoubleArrowLeft } from "react-icons/rx";
import { BsActivity } from "react-icons/bs";
import { IoIosLink } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";
import { FiKey, FiMessageSquare, FiCheckSquare, FiBarChart2 } from "react-icons/fi";
import { HiOutlineSupport } from "react-icons/hi";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';










interface Props {
  children: React.ReactNode
}
export default function layout({ children }: Props) {
  const [fullWidth, setFullWidth] = useState(false);
  const menus = [
    { title: "Dashboard", icon: <RxDashboard />, link: '/dashboard' },
    { title: "Technical SEO", icon: <BsActivity />, link: '/dashboard/technical-seo' },
    { title: "Rank tracker", icon: <FiBarChart2 />, link: '/dashboard/rank-tracker' },
    { title: "Keyword explorer", icon: <FiKey />, link: '/dashboard/keyword-explorer' },
    { title: "Content analysis", icon: <FaRegFileAlt />, link: '/dashboard/content-analysis' },
    { title: "Competitor analysis", icon: <FiUsers />, link: '/dashboard/competitor-analysis' },
    { title: "Link building", icon: <IoIosLink />, link: '/dashboard/link-building' },
    { title: "Optimization plans", icon: <FiCheckSquare />, link: '/dashboard/optimization-plans' },
  ]

  const othermenu = [
    { title: "Feedback", icon: <FiMessageSquare />, link: '/dashboard/feedback' },
    { title: "Support", icon: <HiOutlineSupport />, link: '/dashboard/support' },
    { title: "Support", icon: <CiSettings />, link: '/dashboard/settings' },
  ]

  const pathname = usePathname();
  const isActive = (link: string) => link === pathname;

  const token = sessionStorage.getItem('token');
  const router = useRouter();
  if (!token) router.push('/login')

  return (

    <main className={`h-screen w-full flex overflow-clip`}>
      {/* drawer... */}
      <section
        style={{ width: fullWidth ? "300px" : "60px" }}
        className={`bg-darkPrimary hidden p-4 h-screen overflow-clip lg:flex flex-col justify-between  relative transition-all duration-300 ease-in-out`}
      >
        <div className="absolute -right-3  top-12 p-1 border z-10 bg-white shadow-md rounded-lg cursor-pointer" onClick={() => setFullWidth(!fullWidth)}>
          <RxDoubleArrowLeft className={`${!fullWidth && 'scale-x-[-1]'} duration-300 transition-all ease-out`} />
        </div>
        <div className="grid ">
          <Image src={`${fullWidth ? "/home/white-logo.png" : "/home/mobile-logo.png"}`} className=" pt-2" alt="Webmaxi Logo" height={24} width={124} />

          <div className="grid gap-2 mt-10">
            {menus.map((menu) => {
              return (
                <Link href={`${menu.link}`} className={` ${isActive(menu.link) ? ' text-white bg-[#1570EF]' : ''}  hover:text-white hover:scale-105 transition-all duration-300 ease-in-out p-2 rounded-md flex  text-[#84CAFF] items-center gap-2`}>
                  {menu.icon}
                  {fullWidth && menu.title}
                </Link>
              )
            })}
          </div>
        </div>
        <div className="grid gap-4">
          {othermenu.map((menu) => {
            return (
              <Link href={`${menu.link}`} className={`flex  ${isActive(menu.link) ? ' text-white bg-[#1570EF]' : ''} hover:text-white hover:scale-105 transition-all duration-300 ease-in-out text-[#84CAFF] items-center gap-2`}>
                {menu.icon}
                {fullWidth && menu.title}
              </Link>
            )
          })}
        </div>
      </section>
      <section className={`w-full p-2 px-4 md:px-8 h-screen    `}>
        <div className="flex lg:hidden items-center justify-between w-full p-2">
          <Image src={`/logo.png`} className="pt-2" alt="Webmaxi Logo" height={24} width={124} />
          <IoMdMenu className="text-3xl" />
        </div>

        <div className="flex w-full gap-2 justify-between items-center h-32">
          <div className="flex gap-2 items-center justify-between">
            <select className="p-3 px-6 min-w-[300px] rounded-md border">
              <option className=""> www.google.com </option>
              <option className=""> www.freefoods.com </option>
              <option className=""> www.ecommerce.com </option>
            </select>
            <div>
              {/* <div className="w-full"> */}
              <button className='w-full rounded-lg flex items-center px-3 text-base py-3 bg-primary text-white font-semibold'>
                + <span className={`hidden lg:flex`}>Add project </span>
              </button>
              {/* </div> */}
            </div>
          </div>
          <div className="lg:flex  justify-end hidden">
            <div className="flex items-center gap-4">
              <button className='w-full gap-2 border rounded-lg text-base p-3 flex items-center text-[#344054] font-semibold'>
                <BsLightningCharge /> Upgrade now
              </button>
              <div className=" flex items-center gap-2">
                <CiSearch />
                <IoMdNotificationsOutline />
              </div>
              <div className="">
                <FaRegUserCircle className="rounded-full text-3xl" />
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full mt-1" />
        <div className=" w-full h-full overflow-auto">
          {children}
        </div>

      </section>
    </main>

  );
}
