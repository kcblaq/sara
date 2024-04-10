'use client'
import { useEffect, useState } from 'react'
import { BsLightningCharge } from 'react-icons/bs';
import { CiSearch, CiSettings } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
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
// import DashboardOverviewPlaceholder from './components/DashboardOverviewPlaceholder';
import { LoadingState } from '../component/Loader';
// import { CgOpenCollective } from 'react-icons/cg';
import { PerformanceMetrics } from '@/types/DashboardOverview';
import { fetchPerformanceFailure, fetchPerformanceStart, fetchPerformanceSuccess } from '@/redux/features/performanceMetric slice';
import { setActiveProperty, setAllProperty } from '@/redux/features/propertySlice';
import DashboardOverviewPlaceholder from './components/DashboardOverviewPlaceholder';
import DropdownMenu from '../component/Dropdown';
import UserProfile from './components/UserProfile';


interface Props {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  const [fullWidth, setFullWidth] = useState(false);
  const [property, setProperty] = useState<PropertyType[]>([]);
  // const [currentProperty, setCurrentProperty] = useState(property.length > 0 ? property[0].website_url : "");
  // const [performanceMetric, setPerformanceMetric] = useState<PerformanceMetrics>()
  // const [showProfile, setShowProfile] = useState(false);

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

  const isActive = (link: string) => {
    // const currentPath = pathname.split('/')[1];
    if (link === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(link);
  };

  // const token = typeof window !== 'undefined' ? sessionStorage.getItem('token'): false;
  const token = useSelector((state: RootState) => state)
//  const err = token.property.activeProperty
  const router = useRouter();

  useEffect(() => {
    if (!token.user.token) {
      router.push('/login');

    }
  }, [token, router]);

  const modalState = useSelector((state: RootState) => state.currentModal.currentModal)
  const activeProperty = useSelector((state: RootState) => state.property.activeProperty)
  const dispatch = useDispatch();


  const getProjects = async () => {
    try {
      const res = await ApiCall.get('/crawl/property');
      if(res.status === 401){
        router.push('/login');
        return
      }
      if(res.status === 200){
        // console.log(res.data)
        return res.data;
      }
    } catch (err: any) {
      console.error('Error fetching projects:', err.response.status);
      if(err.response.status === 401){
        router.push('/login')
      }
      return [];
    }
  };
   
  useEffect(() => {
    const fetchProjects = async () => {
      const result = await getProjects();
      setProperty(result);
      // setCurrentProperty(result[0]?.website_url)
      dispatch(setAllProperty(result))
      dispatch(setActiveProperty(result[0]?.website_url))
    };
    

    fetchProjects();
    
  }, []);
  
  // console.log("PROPERTY",activeProperty)

  const getPerformanceMetrics = async (url: string) => {
    if(activeProperty.length > 0){
      dispatch(fetchPerformanceStart())
      try {
        const res = await ApiCall.get('/crawl/overall', {
          params: {
            url: activeProperty,
            type: 'passive',
            limit: 10
          }
        });
        // setPerformanceMetric(res.data)
        dispatch(fetchPerformanceSuccess(res?.data))
        // console.log('Performance metrics:', res.data);
      } catch (error) {
        dispatch(fetchPerformanceFailure(`Failed to fetch performance metric, Error: ${error}`))
        console.error('Error fetching performance metrics:', error);
      }
    }
  }; 

  useEffect(() => {

    if (property.length > 0) {
      getPerformanceMetrics(activeProperty)
        // .then(() => console.log("MET", currentProperty))
        .catch((error) => console.error("Error fetching performance metrics:", error));
    }
  }, [property, activeProperty]);


  return (
    <>
      {modalState === 'addProject' && <MainModal closeModal={() => dispatch(setModal(''))} ModalBody={AddProject} />}

      <main className={`h-screen w-full flex overflow-clip z-0`}>

        {/* drawer... */}
        <section
          style={{ width: fullWidth ? "300px" : "60px" }}
          className={`bg-darkPrimary z-50 hidden p-4 h-screen overflow-clip lg:flex flex-col justify-between  relative transition-all duration-300 ease-in-out`}
        >
          <div className="absolute -right-0  top-14 p-1 bg-white shadow-md rounded-md cursor-pointer" onClick={() => setFullWidth(!fullWidth)}>
            <RxDoubleArrowLeft className={`${!fullWidth && 'scale-x-[-1]'} z-50 duration-300 transition-all ease-out`} />
          </div>
          <div className="grid ">
            <Link href={`/`}>
              <Image src={`${fullWidth ? "/home/white-logo.png" : "/home/mobile-logo.png"}`} className=" pt-2" alt="Webmaxi Logo" height={24} width={124} />
            </Link>

            <div className="grid gap-2 mt-10">
              {menus.map((menu) => {
                return (
                  <Link key={menu.link} href={`${menu.link}`} className={` ${isActive(menu.link) ? ' text-white bg-[#1570EF]' : ''}  hover:text-white hover:scale-105 transition-all duration-300 ease-in-out p-2 rounded-md flex  text-[#84CAFF] items-center gap-2`}>
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
                <Link key={menu.link} href={`${menu.link}`} className={`flex  ${isActive(menu.link) ? ' text-white bg-[#1570EF]' : ''} hover:text-white hover:scale-105 transition-all duration-300 ease-in-out text-[#84CAFF] items-center gap-2`}>
                  {menu.icon}
                  {fullWidth && menu.title}
                </Link>
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
              {/* <select className="p-3  min-w-[300px] rounded-md border" value={currentProperty && currentProperty.length > 0 ? currentProperty : ''} onChange={(e)=> setCurrentProperty(e.target.value)} >
                {
                  property.map((item)=> <option key={item.website_url} className='' value={JSON.parse(item.website_url)}> {JSON.parse(item.website_url) } </option> )
                }
              </select> */}
              <DropdownMenu />
              <div>
                <div className="w-full">
                  <button className='w-full rounded-lg flex items-center px-3 text-base py-3 bg-primary text-white font-semibold' onClick={() => dispatch(setModal('addProject'))}>
                    + <span className={`hidden lg:flex`}>Add project </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:flex  w-full justify-end hidden">
              <div className="flex items-center justify-end w-full gap-4">
                <button className=' gap-2 border rounded-lg text-base p-3 flex items-center text-[#344054] font-semibold'>
                  <BsLightningCharge /> Upgrade now
                </button>
                <div className=" flex items-center gap-2">
                  <CiSearch />
                  <IoMdNotificationsOutline />
                </div>
                {/* <div className="">
                  <FaRegUserCircle className="rounded-full text-3xl" />
                </div> */}
                <UserProfile />
              </div>
            </div>
          </div>
          <hr className="w-full mt-1 hidden md:flex " />
          {
            property.length < 1 ? <DashboardOverviewPlaceholder /> : <div className=" w-full h-full overflow-auto p-2 md:p-8">
            
            {children}
          </div>
          }
        </section>
      </main>
    </>

  );
}
