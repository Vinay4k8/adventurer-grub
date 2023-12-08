"use client";
import {  Bars3Icon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { signIn,  useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Menu = ({menu,setMenu}) => {
  const {data:session}=useSession();
  return (
    <div className={`fixed ${menu?"-left-0":"-left-full"} md:hidden  shadow-md bg-white transition-all duration-200 h-full w-full fixed top-0 py-4 px-4 text-gray-500` }> 
    <button onClick={()=>{setMenu(!menu)}} className='my-5'>
      <Bars3Icon className='w-10 h-10'/>
    </button>
    <div className='space-y-5 m-3'>
    <Link href={"/"} >
        <button onClick={()=>{setMenu(!menu)}}  className='text-xl font-semibold tracking-widest hover:text-gray-500/20 block my-5'>
      Home
        </button>
      </Link>
      <Link href={"/profile"} className='text-xl font-semibold tracking-widest hover:text-gray-500/20'>
        <button onClick={()=>{setMenu(!menu)}}>
      Account
        </button>
      </Link>
    {!session?.user?  <div><button 
            onClick={async(e)=>{await signIn("google");setMenu(!menu)}}
            className=' bg-black rounded-full text-green-400 py-2 px-4 mx-2 hover:scale-105 transition-all duration-150 ease-in font-medium'>
                Login
            </button>
            <button
             onClick={async(e)=>{await signIn("google");setMenu(!menu)}}
            className='bg-black rounded-full text-green-400 py-2 px-4 mx-2 hover:scale-105 transition-all duration-150 ease-in font-medium'>
                Sign Up
            </button></div>:<div>
            <Link href={"/createpost"}> <button onClick={()=>{setMenu(!menu)}} className='text-xl hover:bg-gray-500/30 font-semibold flex gap-3 rounded-full tracking-widest py-2 items-center h-11'>
                <PencilSquareIcon className='w-6 h-6'/> Create Post
            </button></Link>
              </div>}
    </div>
    </div>
  )
}


export default Menu
