"use client";
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useContext, useEffect, useState } from 'react'

import { blogContext } from '@/lib/BlogContext';
import Post from './Post';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Profile = () => {
    const {data:session}=useSession();
    const [blogs,setBlogs]=useState(null);
    const {getUserBlogs,allBlogs}=useContext(blogContext);


    useEffect(()=>{setBlogs(getUserBlogs())},[allBlogs]);
if(session?.user){
  return (session && <div className='my-5'>
           <div className='grid md:grid-cols-[0.5fr,1.5fr] grid-cols-1 p-3 shadow-md rounded-sm'>
        <div className='flex items-center justify-center '>
            <img src={session?.user?.image} alt={"Profile"} />
        </div>
        <div className='space-y-5 p-3 font-medium text-gray-500'>
            <h3 className='md:text-2xl text-lg tracking-widest'>Name : {session?.user?.name}</h3>
            <h3 className='md:text-2xl text-lg tracking-widest'>Email : {session?.user?.email}</h3>
            <button className='text-gray-400 m-5 rounded-md hover:bg-gray-400/20 hover:scale-105 flex items-center  gap-5 p-5 md:text-2xl text-lg'
        onClick={signOut}
        >
        <ArrowLeftOnRectangleIcon className='w-10 h-10 text-red-400' /> Logout
        </button>
        </div>
           </div>
           <div className='my-5'>
            <h1 className='text-3xl my-3 uppercase underline decoration-green-400'>Your Blog's</h1>
            {blogs ?<div>
                { blogs.length==0?<div className='text-2xl font-semibold'>No Blog's are created Yet</div>:<div className='w-full gap-x-16 grid md:grid-cols-2 grid-cols-1 gap-y-6 ' >
                    {blogs.map((blog,i)=>{
                        return <Post blog={blog} key={i}/>
                    })}
                    </div>}
            </div>:<div>No Blog's are created Yet</div>}
           </div>
    </div>
  )}else{
    return(
        <div className='min-h-screen w-full flex items-center justify-center flex-col'>
            <h1 className='text-3xl text-gray-500 tracking-widest underline my-4 decoration-yellow-400'>Please SignUp or Login to continue !</h1>
            <div className='flex gap-5'>
            <button 
            onClick={async(e)=>{await signIn("google")}}
            className='bg-black rounded-full text-green-400 py-2 px-4 mx-2 hover:scale-105 transition-all duration-150 ease-in font-medium'>
                Login
            </button>
            <button
             onClick={async(e)=>{await signIn("google")}}
            className='bg-black rounded-full text-green-400 py-2 px-4 mx-2 hover:scale-105 transition-all duration-150 ease-in font-medium'>
                Sign Up
            </button>
            </div>
        </div>
    )
  }
}

export default Profile