

import SinglePost from '@/components/SinglePost'
import React from 'react'


const page = ({params:{slug}}) => {
  
  return (
    <div className='max-w-6xl mx-auto'>
        <SinglePost id={slug} />
        
    </div>
  )
}

export default page