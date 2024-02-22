'use client'
import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";





export const SignupComponent = () => {
    const [isPassword, setIsPassword] = useState('password')

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required").min(3, "Name should be atleast 3 letters"),
            email: Yup.string().email('Please enter a valid email').required("Email is a required field"),
            password: Yup.string().required().min(8, 'Password must be atleast 8 character')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    'Password must contain a combination of capital and small letters, a digit, and a special character'
                )
        }),
        onSubmit: () => {
          try {
            axios.post('https://api.webmaxi.net/api/auth/register', {
                name: formik.values.name,
                email: formik.values.email,
                password: formik.values.password
            })
          }
          catch(err){
            console.log(err)
          }
        }
    })
  
    const currentYear = () => {
        const currentDate = new Date();
        return currentDate.getFullYear()
    }

    return (
        <main className=" w-full h-full flex flex-col gap-10 lg:justify-between ">

            <Link href={`/`}>

                <Image src={`/logo 3.png`} alt="Webmaxi Logo" width={200} height={0} className="hidden lg:flex" />
                <Image src={`/mobile-logo.png`} alt="Webmaxi Logo" width={20} height={0} className="flex lg:hidden" />
            </Link>
            <form onSubmit={formik.handleSubmit}>
                <section className="lg:px-20 sm:px-32  w-full justify-between flex flex-col gap-2">
                    <div className="flex flex-col w-full my-2">
                    <p className=" font-bold text-lg lg:text-2xl">Signup  </p>
                    <small className="font-thin "> Start your free trial today</small>
                    </div>

                    <label className="font-bold text-sm lg:text-base"> Name*</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your name"
                        className={`p-2 rounded-md border focus:outline-none ${formik.touched.name && formik.errors.name && 'border-red-400'} focus:shadow focus:shadow-purple-700  `} />
                    {formik.touched.name && formik.errors.name && (
                        <small className="text-red-500">{formik.errors.name}</small>
                    )}
                    <label
                        className="font-bold text-sm lg:text-base">
                        Email*</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={`p-2 rounded-md border focus:outline-none ${formik.touched.email && formik.errors.email && 'border-red-400'} focus:shadow focus:shadow-purple-700  `}  />
                    {formik.touched.email && formik.errors.email && (
                        <small className="text-red-500">{formik.errors.email}</small>
                    )}
                    <label
                        className="font-bold text-sm lg:text-b">
                        Password*
                    </label>
                    <span className="relative w-full">
                        <input
                            type={isPassword}
                            placeholder="Create a password"
                            name="password"
                            id="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            className={`p-2 rounded-md border focus:outline-none ${formik.touched.password && formik.errors.password && 'border-red-400'} focus:shadow focus:shadow-purple-700  w-full `}  />
                        {formik.touched.password && formik.errors.password && (
                            <small className="text-red-500">{formik.errors.password}</small>
                        )}
                        <span className="absolute right-2 top-3 cursor-pointer">
                            {isPassword == "text" ?
                                <span className="" onClick={() => setIsPassword('password')}><IoEyeOffOutline /> </span>
                                : <span className="" onClick={() => setIsPassword('text')} > <IoEyeOutline /></span>} </span>
                    </span>
                    <small className=" font-thin -mt-2 " > Must be at least 8 characters.</small>
                    <button
                        className=" w-full p-2 font-bold bg-purple-700 text-white rounded-md"
                        type="submit"
                    >
                        Create
                        account
                    </button>

                    <button className=" w-full p-2 font-bold rounded-md border flex items-center justify-center gap-2"><FcGoogle /> Signup with google </button>
                    <Link href={`/login`}><small className=""> Already have an account? <span className=" text-purple-700 font-bold"> Log in</span></small> </Link>
                </section>
            </form>
            <footer className="lg:flex justify-between w-full items-center hidden ">
                <small className=""> &#169;Webmaxi {currentYear()}.</small>
                <small className="flex items-center gap-1"> <CiMail /> help@webmaxi.net</small>
            </footer>


        </main>
    )
}
