"use client";

import EditPost from '@/components/EditPost';
import { blogContext } from '@/lib/BlogContext';
import { useSession } from 'next-auth/react';
import React, { useContext, useEffect, useState } from 'react'

const page = ({params:{slug}}) => {

    const {editPost,getEditPost,allBlogs}=useContext(blogContext);
    const {data:session}=useSession();
   useEffect(()=>{getEditPost(slug)},[editPost,allBlogs]);

  return (editPost && 
    <div className='max-w-6xl p-3 mx-auto'>
      <h1 className='text-3xl my-4 font-semibold underline decoration-yellow-400'>Edit Post  {editPost.title}</h1>
     {session && session.user.id===editPost.author._id  ? <EditPost blog={editPost}/>:<div>You are not the Author</div>}
    </div>
  )
}

export default page