"use client";

import { useSession } from "next-auth/react";

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const blogContext=createContext({});

 const BlogContext=({children})=>{

    const [allBlogs,setAllBlogs]=useState([]);
    const {data:session}=useSession();
    const [singlePost,setSinglePost]=useState(null);
    const [editPost,setEditPost]=useState(null);
    const [progress,setProgress]=useState();
    const [loading,setLoading]=useState(false);
    const [searchCom,setSearchCom]=useState("")

useEffect(()=>{getAllBlogs()},[])

    const getAllBlogs=async()=>{
        setProgress(30)
        let blogs=await fetch("/api/post");
       setProgress(70)
        setAllBlogs(await blogs.json());
       setProgress(100)
    }
    const getUserBlogs=()=>{
        setProgress(30);
        if(allBlogs.length<=0) getAllBlogs();
        setProgress(50)
        let userBlogs=allBlogs.filter((blog)=>{
            return blog.author._id===session?.user?.id;
        })
        setProgress(100);
        return userBlogs;
    }

    const deleteBlog=async(blogId,authorId,delBanner)=>{
        setProgress(30)
        if(session?.user?.id!==authorId){setProgress(100);
            toast.error("You cant delete it")
            return}
        const data={blogId,authorId,userId:session?.user?.id,delBanner}
        const res=await fetch("/api/post",{
            method:"DELETE",body:JSON.stringify(data)
        })
        setProgress(70)
        getAllBlogs();
        setProgress(100)
        toast.success("Successfully Deleted")
    }

    const editBlog=async(blogId,blog,authorId)=>{
        setProgress(30)
        if(authorId!=session?.user?.id){setProgress(100);
            toast.error("You cant edit it")
            return}
       
        const data={blogId,blog}
        const res=await fetch("/api/post",{
            method:"PUT",body:JSON.stringify(data)
        })
        toast.success("Successfully Edited your blog")
        setProgress(70);
        getAllBlogs();
        setProgress(100);
        
    }

    const getBlog=async(id)=>{
    setProgress(50)
    const blogPost=await allBlogs.find(({_id})=>{return _id===id});
    setProgress(70)
    setSinglePost(blogPost)
    setProgress(100)
        
    }

    const postBlog=async(data)=>{
        setLoading(true)
        setProgress(50);
        const res=await fetch("/api/post",{method:"POST",body:JSON.stringify({...data,author:session?.user?.id})})
        setProgress(70);
        getAllBlogs();
        toast.success("Created the blog")
        setProgress(100);
        setLoading(false);
    }
    const getEditPost=async(id)=>{
        setLoading(true)
        setProgress(50);
        if(allBlogs.length<=0) getAllBlogs();
        const blogPost=await allBlogs.find(({_id})=>{return _id===id});
        setProgress(70);
        setEditPost(blogPost)
        setProgress(100);
        setLoading(false)
    }
    return (
        <blogContext.Provider value={{setSearchCom,searchCom,loading,setLoading,getUserBlogs,progress,setProgress,getEditPost,editPost,setEditPost,setSinglePost,singlePost,editBlog,getAllBlogs,deleteBlog,allBlogs,getBlog,postBlog}}>
            {children}
        </blogContext.Provider>
    )


}

export default BlogContext;