"use client"
import React, { useContext, useEffect } from 'react'
import Post from './Post'
import { blogContext } from '@/lib/BlogContext'

const Posts = () => {
  const {allBlogs,getAllBlogs,setSinglePost,setEditPost,searchCom}=useContext(blogContext);
  useEffect(()=>{
    getAllBlogs()
    setSinglePost(null);setEditPost(null);
  },[])
  return (
    <div className='w-full gap-x-16 grid  grid-cols-1 md:grid-cols-2 gap-y-6 '>
      {allBlogs.length>0 && searchCom.length==0? allBlogs.map((blog,i)=>{
        return <Post key={i}
        blog={blog}
        />
      }):<>
        {allBlogs.map((blog,i)=>{
          let value=blog.title.toLowerCase().includes(searchCom.toLowerCase()) || blog.author.name.toLowerCase().includes(searchCom.toLowerCase()) ||
          blog.tags.some(tag => tag.toLowerCase().includes(searchCom.toLowerCase()))
          if(value){
          return <Post key={i}
        blog={blog}
        />}
        return null
        })}</>
      }
        
    </div>
  )
}

export default Posts