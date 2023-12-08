import Profile from '@/components/Profile'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-6xl mx-auto p-3'>
      <h1 className='underline decoration-green-400 text-2xl uppercase tracking-widest'>Account</h1>
        <Profile/>
    </div>
  )
}

export default page