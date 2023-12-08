import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import React from 'react'

const ThemeIcon = ({theme}) => {
  return (
    <div>
        {theme==="light"?<SunIcon className='w-11 h-11'/>:<MoonIcon className='w-11 h-11'/>}
    </div>
  )
}

export default ThemeIcon