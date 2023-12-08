"use client";
import { blogContext } from '@/lib/BlogContext';
import { useContext } from 'react';
import LoadingBar from 'react-top-loading-bar'

const TopLoadingBar = () => {
    const {progress,setProgress}=useContext(blogContext);
  return (
    <div>
         <LoadingBar
        color='green'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </div>
  )
}

export default TopLoadingBar