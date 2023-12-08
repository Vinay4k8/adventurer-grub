import { PhotoIcon } from '@heroicons/react/24/outline';
import React, { useContext, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { storage } from '@/lib/firebase';
import {getDownloadURL, ref,uploadBytes} from "firebase/storage"
import {v4} from "uuid";
import { blogContext } from '@/lib/BlogContext';
import { useRouter } from 'next/navigation';
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



const CreatePost = () => {
  const imageRef=useRef();
  const [imageFile,setImage]=useState(null);
  const [content,setContent]=useState("");
  const [title,setTitle]=useState("");
  const [summary,setSummary]=useState("");
  const [tags,setTags]=useState([]);
  const [tag,setTag]=useState("");
  const {postBlog,loading,setLoading}=useContext(blogContext);
  const router=useRouter();



  const UploadPost=async()=>{
    setLoading(true)
    if(imageFile==null){
      toast.error("Upload banner to continue");setLoading(false)
      return;}
      const imageRef=ref(storage,`images/${imageFile.name+v4()}`);
      const uploadTask = uploadBytes(imageRef, imageFile);
      
      // Wait for the upload to complete
      await uploadTask;
  
      // Get the download URL for the uploaded image
      const downloadURL = await getDownloadURL(imageRef);
      
      
        const data={
          title,content,summary,banner:downloadURL,tags
        }
        postBlog(data);
        
        router.push("/")
      
  }

 const addTag=()=>{
  
  setTags(prv=>[...prv,tag])
  setTag("")
 }

 const deleteTag=(i)=>{
  setTags((prv)=>{
    let newTags=prv.splice(i,1);
    return newTags
  })
 }
if(typeof window != undefined)
  return (
    <div className='text-gray-500 p-3'>
        <div>
          Title:
        <input type='text' placeholder="Enter tilte" className='text-gray-400 w-full p-3 outline-none my-4 shadow-md' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
        Summary:
        <input type='text' placeholder="Enter Summary" className='text-gray-400 w-full p-3 shadow-md rounded-md my-4 outline-none' value={summary} onChange={(e)=>{setSummary(e.target.value)}} />
        {!imageFile && <button className='flex items-center justify-center p-4 border-dashed border-gray-400 text-gray-500 w-full border-2 my-4 gap-3 font-semibold text-lg cursor-pointer'
        onClick={()=>{imageRef.current.click()}}
        >
          <PhotoIcon className='h-10 w-10'/>   Click To Add
        </button>}
        {imageFile && <div onClick={()=>{setImage(null)}}>
          <img  src={URL.createObjectURL(imageFile)}  className='w-full h-auto cursor-not-allowed hover:grayscale transition-all duration-200 ease-in-out'  />
          </div>}
        <input type='file' ref={imageRef} onChange={(e)=>{setImage(e.target.files[0])}} className='hidden' accept=".jpg, .jpeg, .png"/>
        Content:
        <ReactQuill value={content} onChange={(newValue)=>{setContent(newValue)}} formats={formats} modules={modules} />
        </div>
        <div className='my-3 text-gray-500'>
          Tags : <br/>
          <input type='text' placeholder='Enter tag' value={tag} onChange={(e)=>{setTag(e.target.value)}}  className='shadow-md outline-none p-3'/>
          <button className='bg-black px-4 py-2 m-2 rounded-md text-green-400'
          disabled={!tag.length>0}
          onClick={addTag}>
            Add Tag
          </button>
          <div className='flex my-2 gap-2 justify-center items-center'>
            {tags.length>0 && tags.map((t,i)=>{
              return <div  key={i} className='bg-gray-400 gap-4 text-gray-800 rounded-full px-4 py-2' >{t}
              <button className='text-red-400' onClick={()=>{deleteTag(i)}}>X</button>
              </div>
            })}
          </div>
        </div>
        <div className='flex gap-4 p-3'>

        <button onClick={UploadPost} 
        disabled={loading}
        className=' mx-5 py-2 px-4 hover:scale-105 shadow-md bg-black text-green-400 rounded-sm'>
          {!loading?"Create Post":"Creating post..."}
        </button>
        <button 
        className='px-4 py-2 bg-green-400 rounded-sm text-black font-semibold'
        disabled={loading}
        onClick={()=>{router.push("/")}}>
          Cancel
        </button>
          </div>
    </div>
  )
}

export default CreatePost