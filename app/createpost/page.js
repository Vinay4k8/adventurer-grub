"use client";
import CreatePost from '@/components/CreatePost'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [isReady,setReady]=useState(false);
  useEffect(()=>{
    if(typeof window==="object")
    setReady(true);
  },[isReady])
  return (isReady &&
    <div className='max-w-6xl mx-auto my-4'>
        <CreatePost/>
      
    </div>
  )
}

export default page