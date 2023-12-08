"use client";

import { Bars3Icon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { signIn, useSession } from 'next-auth/react'
import React, { useContext, useEffect, useState } from 'react'
import ThemeIcon from './ThemeIcon';
import Link from 'next/link';
import Menu from './Menu';
import { blogContext } from '@/lib/BlogContext';


const Navbar = () => {
    const {data:session}=useSession();
    const {allBlogs,getAllBlogs}=useContext(blogContext);
    const [menu,setMenu]=useState()
    useEffect(()=>{
        if(allBlogs.length==0)
        getAllBlogs();
    },[allBlogs])

  return (
    <div className='p-2  shadow-md rounded-md top-0 left-0 z-50 bg-white sticky '>
        <div className='max-w-6xl flex justify-between items-center mx-auto'>
        <button onClick={()=>{setMenu(!menu)}} className='md:hidden'>
      <Bars3Icon className='w-10 h-10'/>
    </button>
    <Menu menu={menu} setMenu={setMenu} />
       <Link href={"/"}><div className='p-4 '>  
        <h1 className='font-pacifico text-green-700 font-bold text-3xl sm:text-4xl
        underline decoration-yellow-400'>
            Adventurer Grub
        </h1>
            
        <h4 className=' font-ubuntu text-sm text-green-400 font-semibold mt-1'>
        Blog: Share, Connect , Inspire , Repeat
        </h4>
        </div>
        </Link> 
        {/* themeicon */}
        <div className='flex gap-3 items-center justify-center'>
            {/* <ThemeIcon theme={"dark"}/> */}

  
        
        {/* login button */}
        {!session?.user ? <div className='hidden md:block'>
            <button 
            onClick={async(e)=>{await signIn("google")}}
            className='bg-black rounded-full text-green-400 py-2 px-4 mx-2 hover:scale-105 transition-all duration-150 ease-in font-semibold text-xl'>
                Login
            </button>
            <button
             onClick={async(e)=>{await signIn("google")}}
            className='bg-black rounded-full text-green-400 py-2 px-4 mx-2 hover:scale-105 transition-all duration-150 ease-in font-semibold text-xl'>
                Sign Up
            </button>

        </div>:<div className='hidden md:flex justify-center gap-7 items-center'>
           <Link href={"/createpost"}> <div className='bg-black text-green-400 text-lg font-semibold flex gap-3 rounded-full px-4 py-2 items-center h-11'>
                <PencilSquareIcon className='w-6 h-6'/> Create Post
            </div></Link>
            <Link href={"/profile"} >
            <img className='rounded-full w-14 h-14' src={session?.user?.image}/>
            </Link>
          
            
        </div>
        }</div>
        </div>
    </div>
  )
}

export default Navbar