"use client";
import { blogContext } from '@/lib/BlogContext'
import React, { useContext } from 'react'

const SearchBar = () => {
    const {searchCom,setSearchCom}=useContext(blogContext)
  return (
    <div className=''>
        <input type='text' className='w-full p-3 text-xl my-3 border-y-2 border-gray-400 text-gray-500 outline-none' placeholder="Search by tags or title or Author"
        value={searchCom} onChange={(e)=>{setSearchCom(e.target.value)}}
        />
    </div>
  )
}

export default SearchBar