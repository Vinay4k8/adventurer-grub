"use client";

import { blogContext } from '@/lib/BlogContext';
import React, { useContext, useEffect, useState } from 'react'

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import { useRouter } from 'next/navigation';
import deleteImage from '@/lib/deleteImage';




const SinglePost = ({id}) => {
    const {getBlog,allBlogs,getAllBlogs,singlePost,deleteBlog}=useContext(blogContext);
    
    const router=useRouter();
    

    const {data:session}=useSession();
    useEffect(()=>{
        if(allBlogs.length<=0)
        getAllBlogs();
    
         getBlog(id)
        
    },[allBlogs,singlePost])


    const deletePost=()=>{
        deleteBlog(singlePost._id,singlePost.author._id,singlePost.banner);
        
       router.push("/")
    }


  return (singlePost &&
    <div className="p-3">
        <h1 className='text-2xl uppercase tracking-[3px] underline decoration-yellow-400 my-4 '>{singlePost.title}</h1>
        <p className='text-gray-500 uppercase'>By : @{singlePost.author.name}  {new Date(singlePost.createdAt).toLocaleDateString()}</p>
       { session?.user?.id===singlePost.author._id &&<div className=' p-3 flex items-center justify-center gap-5'>
            <Link href={"/editpost/"+singlePost._id}><button 
            className='bg-green-400 flex shadow-md text-white px-4 py-2 rounded-md'>
              <PencilSquareIcon className='mx-2 w-6 h-6'/>  Edit Post
            </button></Link>
            <button className="bg-red-400 shadow-md text-white px-4 py-2 rounded-md flex"
            onClick={()=>{deletePost()}}
            > <TrashIcon className='w-6 h-6 mx-2'/>
                Delete Post
            </button>
        </div>}
        <div className='relative h-40 rounded-md overflow-hidden'>
                <img src={singlePost.banner}  className='object-contain object-center my-auto blur-sm'/>
        <div className='absolute h-full  bg-green-400 w-full  z-20 top-0 opacity-80 flex items-center justify-between p-4'>
            <img src={singlePost.author.image} className='w-10 h-10 rounded-full' />
            <div className='flex justify-center items-center gap-3'>
                {singlePost.tags.map((tag,i)=>{
                    return <div key={i} className='bg-black text-green-400 rounded-full px-4 py-2'>
                        {tag}
                    </div>
                })}
            </div>
        </div>
        </div>
        <div dangerouslySetInnerHTML={{__html:singlePost.content}} id='reactQuillC'  
        ></div>
        <div className='my-2'>
        <img src={singlePost.banner} />
        </div>
    </div>
  )
}

export default SinglePost