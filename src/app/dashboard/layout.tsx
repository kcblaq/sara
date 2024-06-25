'use client'
import { useEffect, useState } from 'react'
import { BsLightningCharge } from 'react-icons/bs';
import { CiSearch, CiSettings } from 'react-icons/ci';
import { IoMdMenu, IoMdNotificationsOutline } from 'react-icons/io';
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
import { useDispatch } from 'react-redux';
import { setModal } from '@/redux/features/modalstates';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import MainModal from '../component/modals/MainModal';
import AddProject from './components/AddProject';
import ApiCall from '../utils/apicalls/axiosInterceptor';
import { PropertyType } from '@/types/PropertyType';
import { fetchPerformanceSuccess } from '@/redux/features/performanceMetric slice';
import { setActiveProperty, setAllProperty } from '@/redux/features/propertySlice';
import DashboardOverviewPlaceholder from './components/DashboardOverviewPlaceholder';
import DropdownMenu from '../component/Dropdown';
import UserProfile from './components/UserProfile';
import { removeTrailingSlash } from '../utils/RemoveSlash';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import Loader, { LoaderPulse } from '../component/Loader';
import { crawler } from '../services/crawler';
import { isAllOf } from '@reduxjs/toolkit';
import { PopoverComponent } from './components/ui/PopOver';
import CheckUserType from './components/CheckUserType';
import Button from './components/ui/Button';
import AutoModal from '../component/modals/AutoModal';


interface Props {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  const [fullWidth, setFullWidth] = useState(false);
  // const [property, setProperty] = useState<PropertyType[]>([]);
  const [err, setErr] = useState({ status: false, msg: '' });
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const menus = [
    { title: "Dashboard", icon: <RxDashboard />, link: '/dashboard' },
    { title: "Technical SEO", icon: <BsActivity />, link: '/dashboard/technical-seo' },
    { title: "Rank tracker", icon: <FiBarChart2 />, link: '/dashboard/rank-tracker' },
    { title: "Keyword explorer", icon: <FiKey />, link: '/dashboard/keyword-explorer' },
    { title: "Content analysis", icon: <FaRegFileAlt />, link: '/dashboard/content-analysis' },
    { title: "Competitor analysis", icon: <FiUsers />, link: '/dashboard/competitor-analysis' },
    { title: "Link building", icon: <IoIosLink />, link: '/dashboard/link-building' },
    { title: "Optimization plans", icon: <FiCheckSquare />, link: '/dashboard/optimization-plans' },
  ];


  const othermenu = [
    { title: "Feedback", icon: <FiMessageSquare />, link: '/dashboard/feedback' },
    { title: "Support", icon: <HiOutlineSupport />, link: '/dashboard/support' },
    { title: "Support", icon: <CiSettings />, link: '/dashboard/settings' },
  ]

  const pathname = usePathname();

  const isActive = (link: string) => {
    // const currentPath = pathname.split('/')[1];
    if (link === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(link);
  };


  const token = useSelector((state: RootState) => state.user.token);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');

    }
  }, [token, router]);



  const modalState = useSelector((state: RootState) => state.currentModal.currentModal)
  const activeProperty = useSelector((state: RootState) => state.property.activeProperty);
  const property = useSelector((state: RootState) => state.property.allProperty);
  const user = useSelector((state: RootState) => state.user.user);



  const dispatch = useDispatch();


  const getProjects = async () => {
    try {
      const res = await ApiCall.get('/crawl/property');
      if (res.status === 401) {
        router.push('/login');
        return
      }
      if (res.status === 200) {
        dispatch(setAllProperty(res.data))
        activeProperty.length < 1 && dispatch(setActiveProperty(removeTrailingSlash(res.data[0]?.website_url)))
        return res.data;
      }
    } catch (err: any) {
      console.error('Error fetching projects:', err.response.status);
      if (err.response.status === 401) {
        router.push('/login')
      }
      return [];
    }
  };

  // useQuery({
  //   queryKey: ["dashboard"],
  //   queryFn: getProjects,

  // })

  const fetchDashboardData = async () => {
    // console.log("ACTIVEPROP", activeProperty)
    const response = await ApiCall.get("/crawl/overall", {
      params: {
        url: removeTrailingSlash(activeProperty),
        limit: 100
      }
    })
    dispatch(fetchPerformanceSuccess(response?.data))

  }
  useEffect(() => {
    const fetchProjects = async () => {
      getProjects();


    };
    fetchProjects();
    fetchDashboardData()

  }, [activeProperty]);





  // const { data } = useQuery({
  //   queryKey: ["dashboard"],
  //   queryFn: fetchDashboardData,
  // })


  // console.log("DATA", data)

  // console.log("ACTIVE", activeProperty)
  // console.log("PROP", property)

  // const enab = activeProperty ? activeProperty.length > 2 : false
  //  const { data, isLoading } =  useQuery({
  //     queryKey: ['dashboardData', activeProperty],
  //     queryFn: () => {
  //       return ApiCall.get('/crawl/overall', {
  //         params: {
  //           url: removeTrailingSlash(activeProperty),
  //           limit: 100
  //         }
  //       })
  //     },
  //     enabled: enab
  //   }) 





  async function handleSubmitUrl() {
    const urlPattern = /^(ftp|http[s]?):\/\/[^ "]+(\.[^ "]+)+$/
    if (!urlPattern.test(activeProperty)) {
      setErr({ status: true, msg: 'Enter a valid url' })
      setLoading(false)
      setTimeout(() => {
        setLoading(false)
        setErr({ status: false, msg: '' })
      }, 5000)
      return
    }
    try {
      setLoading(true)
      dispatch(setModal('addProject'))
      ApiCall.get(`crawl/add-property?url=${removeTrailingSlash(activeProperty)}`);
      dispatch(setActiveProperty(removeTrailingSlash(activeProperty)));
      dispatch(setModal('crawling'));
      await Promise.all([
        crawler("/crawl/webcrawler", { url: removeTrailingSlash(activeProperty), type: "passive" }),
        crawler("/crawl/technical/mini-crawler", { url: removeTrailingSlash(activeProperty), timeout: 7 }),
        crawler("/crawl/content-analysis/mini-crawler", { url: removeTrailingSlash(activeProperty) }),
      ])

      dispatch(setModal(''))
    } catch (error: any) {
      console.log("ERR", error)
      setErr({ status: true, msg: error.response.data.message });
      if (error.status === 401) {
        router.push('/login')
      }
      setLoading(false)
      setTimeout(() => {
        setErr({ status: false, msg: '' });
      }, 5000);
      return false;

    }
    setLoading(false)
  }


  const handleRoutes = (e: { preventDefault: () => void; }, link: string) => {
    if (link !== "/dashboard" && user.account_type !== "paid") {
      e.preventDefault();
      setShow(true);
    } else {
      window.location.href = link;
    }
  };

  function closeModal(){
    setShow(false)
  }

  const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null;
    }
  return ( 
    //  <QueryClientProvider client={quertClient}>
    <>
      <div>
        {modalState === 'addProject' && <MainModal closeModal={() => dispatch(setModal(''))} ModalBody={AddProject} />}
          {
            show && <AutoModal closeModal={()=> setShow(false)} ModalBody={<CheckUserType close={closeModal} />}  />
          }

        <main className={`h-screen w-full flex overflow-clip `}>

          {/* drawer... */}

          <section
            style={{ width: fullWidth ? "300px" : "60px" }}
            className={`bg-darkPrimary hidden p-4 h-screen overflow-clip z-40 lg:flex flex-col justify-between  relative transition-all duration-300 ease-in-out`}
          >
            <div className="absolute right-0 z-50 top-12 p-1.5 bg-white border shadow-md rounded-md cursor-pointer" onClick={() => setFullWidth(!fullWidth)}>
              <RxDoubleArrowLeft className={`${!fullWidth && 'scale-x-[-1]'} duration-300 transition-all ease-out`} />
            </div>

            <div className="grid ">
              <Link href={`/`}>
                <Image src={`${fullWidth ? "/home/white-logo.png" : "/home/mobile-logo.png"}`} className=" pt-2" alt="Webmaxi Logo" height={24} width={124} />
              </Link>

              <div className="grid gap-2 mt-12">
                {menus.map((menu) => {
                  return (
                    <a key={menu.link} onClick={(e)=> handleRoutes(e, menu.link)} href={`${menu.link}`} className={` ${isActive(menu.link) ? ' text-white bg-[#1570EF]' : ''}  hover:text-white hover:scale-105 transition-all duration-300 ease-in-out p-2 rounded-md flex  text-[#84CAFF] items-center gap-2`}>
                      {menu.icon}
                      {fullWidth && menu.title}
                    </a>
                  )
                })}
              </div>
            </div>
            <div className="grid gap-4">
              {othermenu.map((menu) => {
                return (
                  <a onClick={(e)=>handleRoutes(e, menu.link)} key={menu.link} href={`${menu.link}`} className={`flex  ${isActive(menu.link) ? ' text-white bg-[#1570EF]' : ''} hover:text-white hover:scale-105 transition-all duration-300 ease-in-out text-[#84CAFF] items-center gap-2`}>
                    {menu.icon}
                    {fullWidth && menu.title}
                  </a>
                )
              })}
            </div>
          </section>
          <section className={`w-full  h-screen    `}>
            <div className="flex md:px-8 lg:hidden items-center justify-between w-full p-2 md:p-4">
              <Image src={`/logo.png`} className="pt-2" alt="Webmaxi Logo" height={24} width={124} />
              <IoMdMenu className="text-3xl" />

            </div>
            <hr className="w-full mt-1 flex md:hidden" />

            <div className="flex z-0 w-full gap-2 p-2  md:px-8 justify-between items-center h-16">
              <div className="flex gap-2  w-full items-center ">
                <DropdownMenu />
                <div>
                  <div className="w-full">
                    <button className='w-full rounded-lg flex items-center px-3 text-base py-3 bg-primary text-white font-semibold' onClick={() => dispatch(setModal('addProject'))}>
                      + <span className={`hidden lg:flex`}> Add project </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:flex  w-full justify-end hidden">
                <div className="flex items-center justify-end w-full gap-4">
                  <Link href={'/pricing'} className=' cursor-pointer gap-2 border rounded-lg border-[#D0D5DD] text-base p-3 flex items-center text-[#344054] font-semibold'>
                    <BsLightningCharge /> Upgrade now
                  </Link>
                  {/* <div className=" flex p-2.5 items-center gap-2">
                  <CiSearch className='text-[#667085] text-2xl' />
                </div> */}
                  {/* <div className=" flex p-2.5 items-center gap-2">

                  <IoMdNotificationsOutline className='text-[#667085] text-2xl' />
                </div> */}

                  <PopoverComponent />
                </div>
              </div>
            </div>
            <hr className="w-full  hidden md:flex " />
            {
              loading ? <LoaderPulse /> :
                property.length < 1 ? <DashboardOverviewPlaceholder /> : <div className=" w-full h-full overflow-auto p-2 md:p-8">

                  {children}
                </div>
            }

          </section>
        </main>
      </div>
    </>
  );
}

