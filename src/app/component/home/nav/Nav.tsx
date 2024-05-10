'use client'
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown, IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

import { useState } from "react";
import FilledButton from "../../FilledButton";
import PlainButton from "../../PlainButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { currentNav, setCurrentState } from "@/redux/features/navSlice";




export default function Nav() {
  const [show, setShow] = useState(false)
  // const [resources, setResources] = useState(false)
  // const [features, setFeatures] = useState(false)

  const router = useRouter()
  const navstate = useSelector(currentNav);
  const dispatch = useDispatch();

  const resource = [
    { title: 'Blog', description: 'The latest industry news, updates and info.', file: '/blog.png', link: '/blog' },
    { title: 'Documentation', description: 'All the boring stuff that you (hopefully won’t) need.', file: '/file.png', link: '/' },
    { title: 'Help and support', description: 'Learn, fix a problem, and get answers to your questions.', file: '/help.png', link: '/help' }
  ]

  const feature = [
    { title: 'Technical SEO audit', description: `Run an AI-driven audit to analyze and improve your website's SEO health.`, file: '/seo.png', link: '/seo-audit' },
    { title: 'Rank tracker', description: `Discover strategic keywords for your industry and target audience.`, file: '/rank.png', link: '/rank' },
    { title: 'Smart keyword explorer', description: `Discover strategic keywords for your industry and target audience.`, file: '/keyword.png', link: '/keyword' },
    { title: 'Optimization recommendations', description: `Customized recommendations for your website based on your SEO audit.`, file: '/optimize.png', link: '/optimize' },
    { title: 'Semantic content analysis', description: `Enhance your content's relevance with semantic analysis.`, file: '/content.png', link: '/keyword' },
    { title: 'Competitor analysis', description: `Compare your SEO metrics with competitors and gain insights.`, file: '/competitor.png', link: '/keyword' },
    { title: 'Link building', description: `Explore potential websites for building valuable backlinks.`, file: '/link.png', link: '/keyword' },

  ]



  return (
    <main className="w-full z-50 justify-between flex items-center font-normal h-[72px] bg-secondary p-2 ">
      <div className=" items-center h-full gap-8 flex w-full">
        <Link href={`/`} className="flex items-center h-full ">

          <Image src={`/logo.png`} alt="Webmaxi Logo" width={145} height={24} className="" />
        </Link>
        <Link href="/" className="text-base font-semibold hidden lg:flex"> Home</Link>


        <span className={`text-base cursor-pointer items-center z-50 font-semibold gap-1 hidden lg:flex`} onClick={(e) => {
          e.stopPropagation()
          dispatch(setCurrentState(`${navstate.current == 'features' ? "" : 'features'}`))

        }}> Features <IoIosArrowDown className={`${navstate.current === "features" && ' transform rotate-180'}`} />
          <div className="relative bg-white z-50">
            {
              navstate.current == "features" && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: navstate.current === "features" ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className=" absolute top-8 z-50 bg-white -left-56 font-normal  grid grid-cols-2 gap-2  min-h-[400px] min-w-[700px] p-8 shadow-md rounded-md">
                {
                  feature.map((item) => {
                    return (
                      <div className="flex z-50 h-full text-base p-2 hover:bg-blue-200 hover:rounded-md items-start w-full gap-3" onClick={() => router.push(`${item.link}`)} >
                        <Image src={item.file} alt={item.description} className="mt-1" height={24} width={24} />
                        <div className=" flex flex-col w-full h-full overflow-auto">
                          <p className=" font-semibold text-base">{item.title} </p>
                          <small className=" text-sm">{item.description} </small>
                        </div>
                      </div>
                    )
                  })
                }

              </motion.div>
            }
          </div>
        </span>




        <span className={`text-base cursor-pointer items-center font-semibold gap-1 hidden lg:flex`} onClick={() => {
          navstate.current === 'resources' ? dispatch(setCurrentState('')) : dispatch(setCurrentState('resources'))
        }}> Resources <IoIosArrowDown className={`${navstate.current === 'resources' && ' transform rotate-180'}`} />
          <div className="relative z-50 bg-white">
            {
              navstate.current === 'resources' && <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: navstate.current == 'resources' ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className=" absolute top-8 bg-white font-normal  flex flex-col gap-2 -right-28  min-w-[300px] p-6 shadow-md rounded-md">
                {
                  resource.map((item) => {
                    return (
                      <div className="flex h-full text-base p-2 items-start hover:bg-blue-200 hover:rounded-md  w-full gap-3" onClick={() => router.push(`${item.link}`)} >
                        <Image src={item.file} alt={item.description} className="mt-1" height={24} width={24} />
                        <div className=" flex flex-col w-full h-full overflow-auto">
                          <p className=" font-semibold text-base">{item.title} </p>
                          <small className=" text-sm">{item.description} </small>
                        </div>
                      </div>
                    )
                  })
                }

              </motion.div>
            }
          </div>
        </span>




        <Link href={'/pricing'} className="text-base cursor-pointer items-center font-semibold gap-1 hidden lg:flex"> Pricing </Link>
      </div>
      <div className=" items-center justify-end h-full gap-6 lg:flex w-full hidden ">
        <Link href={`login`} className=" text-lg font-semibold"> Login </Link>
        <Link href={`/signup`} className=" bg-primary font-semibold px-4 py-3 shadow rounded-md text-white text-lg">Sign up </Link>
      </div>
      <div className="flex items-center justify-end lg:hidden h-full w-full relative">
        <IoMdMenu className="" onClick={() => setShow(true)} />
        {
          show &&
          <section className="h-screen py-6 bg-white text-[#101828] overflow-auto w-screen max-w-[500px] absolute transition-transform duration-300 ease-in-out  right-0 -top-3 transform translate-x-0">
            <span className=" font-semibold absolute text-2xl right-2 top-6 cursor-pointer hover:bg-primary hover:text-white p-1 rounded-full transition-all duration-300" onClick={() => setShow(false)}>
              <IoClose />
            </span>
            <div className="flex flex-col justify-between h-full w-full overflow-auto">
              <div className=" flex p-4 overflow-auto w-full flex-col mt-8 transition-all duration-300 ease-in-out">
                <Link href="/" className="text-base font-semibold p-3 "> Home</Link>

                <span className="text-base cursor-pointer overflow-scroll h-full items-center font-semibold p-3 flex gap-1 justify-between w-full " onClick={() => {
                  navstate.current === 'features' ? dispatch(setCurrentState('')) : dispatch(setCurrentState('features'))

                }}>

                  <span className="flex w-full justify-between items-center"> Features <IoIosArrowDown className={`${navstate.current == 'features' && 'scale-y-[-1]'}`} /> </span>



                </span>


                <div className=" h-full">
                  {
                    navstate.current === 'features' && <div className="p-2 mt-4 m-2 h-full transition-all duration-300 ease-linear border rounded-lg shadow-md w-full flex flex-col overflow-auto">
                      {
                        feature.map((item) => {
                          return (
                            <div className="flex h-full text-base p-2 items-start w-full gap-3" onClick={() => router.push(`${item.link}`)} >
                              <Image src={item.file} alt={item.description} className="mt-1" height={24} width={24} />
                              <div className=" flex flex-col w-full h-full overflow-auto">
                                <p className=" font-semibold text-base">{item.title} </p>
                                <p className=" text-sm">{item.description} </p>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  }

                </div>

                <span className="text-base overflow-auto h-full cursor-pointer items-center font-semibold p-3 gap-1 flex   justify-between w-full" onClick={() => {
                  navstate.current === 'resources' ? dispatch(setCurrentState('')) : dispatch(setCurrentState('resources'))


                }}> Resources
                  <IoIosArrowDown className={`${navstate.current === 'resources' && 'scale-y-[-1]'}`} />

                </span>
                {
                  navstate.current === 'resources' && <div className="p-2 mt-4 m-2 h-full  border rounded-lg shadow-md w-full flex flex-col">
                    {
                      resource.map((item) => {
                        return (
                          <div className="flex h-full text-base p-2 items-start w-full gap-3" onClick={() => router.push(`${item.link}`)} >
                            <Image src={item.file} alt={item.description} className="mt-1" height={24} width={24} />
                            <div className=" flex flex-col w-full">
                              <p className=" font-semibold text-base">{item.title} </p>
                              <p className=" text-sm">{item.description} </p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                }
                <span className="text-base cursor-pointer items-center font-semibold p-3" onClick={() => router.push('/pricing')}> Pricing </span>
              </div>

              <div className="flex p-3 flex-col gap-3">
                <FilledButton title="Sign up" handleClick={() => router.push('/signup')} />
                <PlainButton title="Login" handleClick={() => router.push('/login')} />
              </div>
            </div>
          </section>
        }
      </div>
    </main>
  )
}
