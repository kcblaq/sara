'use client'
import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { IoEyeOffOutline ,IoEyeOutline} from "react-icons/io5";
import { currentYear } from "@/app/utils/currenYear";
import { AxiosInstance } from "@/lib/axios";
import Error from "next/error";
import { useRouter } from "next/navigation";
import Loader from "@/app/component/Loader";



export const LoginComponent = () => {
    const [isPassword, setIsPassword] = useState('password')
    const [userDetail, setUserDetail] = useState({
        name: '',
        password: '',
        email: ''
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: { preventDefault: () => void; target: { name: any; value: any; }; }) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserDetail((detail) => ({
            ...detail,
            [name]: value
        }))

    }
    const router = useRouter()
    async function handleLogin(){
      try {
        const res = await  AxiosInstance.post('/auth/login', {
            email: userDetail.email,
            password: userDetail.password
          })
          if(res.status == 200){
            sessionStorage.setItem("user", res.data)
            router.push('/dashboard')
          }
      } catch (err: any) {
        setError(err.message)
        console.log(err.message)
      }
    }

    return (
        <main className=" w-full h-full flex flex-col gap-10 lg:justify-between ">

            <Link href={`/`}>

                <Image src={`/logo 3.png`} alt="Webmaxi Logo" width={200} height={0} className="hidden lg:flex" />
                <Image src={`/mobile-logo.png`} alt="Webmaxi Logo" width={20} height={0} className="flex lg:hidden" />
            </Link>
            <section className="lg:px-20 sm:px-32  w-full justify-between flex flex-col gap-2">
                <p className=" font-bold lg:text-lg">Login  </p>
                <small className="font-thin text-xs lg:text-base"> Welcome back, please enter your</small>
                <label className="font-bold text-sm lg:text-base"> Email*</label>
                <input type="email" placeholder="Enter your email" name="email" value={userDetail.email} onChange={handleChange} className="p-2 rounded-md  focus:outline-none border focus:shadow focus:shadow-primary" />
                <label className="font-bold text-sm lg:text-b"> Password*</label>
                <span className="relative w-full">
                <input type={isPassword} placeholder="Enter your password" name="password" value={userDetail.password} onChange={handleChange} className="p-2 rounded-md border focus:outline-none focus:shadow focus:shadow-primary w-full"  />
                <span className="absolute right-2 top-3">
                { isPassword == "text" ? 
                <button className="" onClick={()=> setIsPassword('password')}><IoEyeOffOutline/> </button> 
                :<button className="" onClick={()=> setIsPassword('text')} > <IoEyeOutline /></button>  } </span>
                </span>
                <Link href={`/password`}><small className=" font-bold w-full -mt-2 text-xs lg:text-base flex justify-end text-primary cursor-pointer" > 
                    Forget password
                </small> </Link>
                <button 
                className=" w-full p-2 font-bold bg-primary relative gap-2 text-white rounded-md " 
                onClick={handleLogin}> Sign in 
                {/* {isLoading && <span className="absolute max-h-[50px]"><Loader /></span>} */}
                </button>
                <button className=" w-full p-2 font-bold rounded-md border flex items-center justify-center gap-2"><FcGoogle /> Sign in with Google </button>
                <Link href={`/signup`}><small className=""> Don't have an account? <span className=" text-primary right-0"> Sign up</span></small> </Link>
            </section>
            <footer className="lg:flex justify-between w-full items-center hidden ">
                <small className=""> &#169;Webmaxi {currentYear()}.</small>
                <small className="flex items-center gap-1"> <CiMail /> help@webmaxi.net</small>
            </footer>


        </main>
    )
}
