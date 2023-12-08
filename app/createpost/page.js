"use client";
// import CreatePost from '@/components/CreatePost'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

// Use dynamic import for client-side code
const DynamicCreatePost = dynamic(() => import('@/components/CreatePost'), {
  ssr: false, // Disable server-side rendering
});
const page = () => {
  
 
  if(typeof window!== 'undefined')
  return (
    <div className='max-w-6xl mx-auto my-4'>
        <DynamicCreatePost/>
      
    </div>
  )
}

export default page