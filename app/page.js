
import Posts from '@/components/Posts'
import SearchBar from '@/components/SearchBar'




export default function Home() {


  return (
    <main className='p-3 px-5 max-w-6xl mx-auto relative'>
      <SearchBar/>
     <Posts/>
    </main>
  )
}
