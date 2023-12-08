import React from 'react'
import {ArrowUpRightIcon} from "@heroicons/react/24/outline"
import Link from 'next/link'

const Post = ({blog:{_id,title,content,summary,banner,tags,author}}) => {
  return (<Link href={"/post/"+_id}> 
    <div className='group rounded-md shadow-md p-3'>
        <div className='  relative group-hover:scale-105 mb-3 transition-all duration-150 ease-in-out'>
            <img className='mx-auto h-[18rem]' 
            src={banner} />
            <div className='absolute bottom-0 backdrop-filter backdrop-blur-md bg-opacity-10 bg-white w-full h-auto p-4 flex justify-between items-center '>
              <div className=' uppercase font-semibold tracking-widest  rounded-full px-4 py-2 flex gap-3'>
                <img className='w-6 h-6 rounded-full' src={author.image} /> @{author.name}
              </div>
              <div className='flex gap-2'>
             {tags.slice(0,2).map((tag,i)=>{
              return <span key={i} className='bg-green-400 text-black font-semibold text-md py-2 px-4 rounded-full'>
              {tag}
            </span>
             }) }
              
              </div>
              
            </div>
        </div>
        <div>
            <h1 className='font-bold text-2xl underline'>{title}</h1>
            <div className='font-semibold text-sm line-clamp-3'>
               { summary}
            </div>
           <div className='group-hover:underline font-semibold text-lg flex gap-2'>
              Read Post <ArrowUpRightIcon className='w-6 h-6 '/>
            </div>
            
            
        </div>
    </div>
    </Link>
  )
}

export default Post