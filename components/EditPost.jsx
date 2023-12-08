import { PhotoIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { storage } from '@/lib/firebase';
import {getDownloadURL, ref,uploadBytes} from "firebase/storage"
import {v4} from "uuid";
import { blogContext } from '@/lib/BlogContext';
import { useRouter } from 'next/navigation';
import deleteImage from '@/lib/deleteImage';
import toast from 'react-hot-toast';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link'],
    ['clean']
  ],
}
const   formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link'
]



const EditPost = ({blog}) => {
  const imageRef=useRef();
  const [imageFile,setImage]=useState(blog.banner);
  const [ban,setBan]=useState(blog.banner);
  const [content,setContent]=useState(blog.content);
  const [title,setTitle]=useState(blog.title);
  const [summary,setSummary]=useState(blog.summary);
  const [tags,setTags]=useState(blog.tags);
  const [tag,setTag]=useState("");
  const [mountStatus,setMountStatus]=useState(false)

  const {editBlog,loading,setLoading}=useContext(blogContext);
  const router=useRouter();
 


  const UploadPost=async()=>{
    setLoading(true)
    
    if(imageFile==null){
      toast.error("Upload banner to continue");setLoading(false);
       return;}
    const data={}
    if(title!==blog.title) data.title=title
    if(content!==blog.content) data.content=content
    if(summary!==blog.summary) data.summary=summary
    if(tags!==blog.tags) data.tags=tags
    if(imageFile!==blog.banner) {
      deleteImage(blog.banner)
      const imageRef=ref(storage,`images/${imageFile.name+v4()}`);
      const uploadTask = uploadBytes(imageRef, imageFile);
      
      // Wait for the upload to complete
      await uploadTask;
      
      // Get the download URL for the uploaded image
      const downloadURL = await getDownloadURL(imageRef);
      data.banner=downloadURL;
      }
    
    editBlog(blog._id,data,blog.author._id);
    
    router.push("/")
  }

 const addTag=()=>{
  
  setTags(prv=>[...prv,tag])
  setTag("")
 }

 const deleteTag=(i)=>{
  let newTags=tags.filter((t,ind)=>{
    return i!==ind
  })
 
  setTags(newTags)
 }
 useEffect(()=>{
  setMountStatus(true)
 },[])

  return (mountStatus &&
    <div className=''>
        <div>
        <input type='text' placeholder="Enter tilte" className='text-gray-400 w-full p-3 outline-none my-4 shadow-md' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        <input type='text' placeholder="Enter Summary" className='text-gray-400 w-full p-3 shadow-md rounded-md my-4 outline-none' value={summary} onChange={(e)=>{setSummary(e.target.value)}} />
        {!imageFile && <button className='flex items-center justify-center p-4 border-dashed border-gray-400 text-gray-500 w-full border-2 my-4 gap-3 font-semibold text-lg cursor-pointer'
        onClick={()=>{imageRef.current.click()}}
        >
          <PhotoIcon className='h-10 w-10'/>   Click To Add
        </button>}
        {imageFile && ban && <div onClick={()=>{setImage(null);setBan(null)}}>
          <img  src={imageFile}
            className='w-full h-auto cursor-not-allowed hover:grayscale transition-all duration-200 ease-in-out'  />
          </div>}
          {imageFile && !ban && <div onClick={()=>{setImage(null)}}>
          <img  src={URL.createObjectURL(imageFile)}
            className='w-full h-auto cursor-not-allowed hover:grayscale transition-all duration-200 ease-in-out'  />
          </div>}
        <input type='file' ref={imageRef} onChange={(e)=>{setImage(e.target.files[0])}} className='hidden' accept=".jpg, .jpeg, .png"/>
        <ReactQuill value={content} onChange={(newValue)=>{setContent(newValue)}} formats={formats} modules={modules} />
        </div>
        <div className='my-3'>
          <input type='text' placeholder='Enter tag' value={tag} onChange={(e)=>{setTag(e.target.value)}}  className='outline-none p-3'/>
          <button className='bg-black px-4 py-2 rounded-md text-green-400'
          disabled={!tag.length>0}
          onClick={addTag}>
            Add Tag
          </button>
          <div className='flex my-2 gap-2 justify-center items-center'>
            {tags.length>0 && tags.map((t,i)=>{
              return <div key={i} className='bg-gray-400 gap-4 text-gray-800 rounded-full px-4 py-2' >{t}
              <button className='text-red-400 mx-2' onClick={()=>{deleteTag(i)}}>X</button>
              </div>
            })}
          </div>
        </div>
        <div className='flex gap-4 p-3'>

        <button 
        disabled={loading}
        onClick={UploadPost} className='px-4 rounded-sm py-2 px-auto bg-black text-green-400'>
         { !loading?"Edit Post":"Editing Post..."}
        </button>
        <button
        onClick={()=>{router.push("/");}}
        disabled={loading}
        className='px-4 py-2 bg-green-400 rounded-sm text-black font-semibold'>
          Cancel
        </button>
          </div>
    </div>
  )
}

export default EditPost