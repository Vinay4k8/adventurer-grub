
import './globals.css'
import Provider from '@/components/Provider'
import Navbar from '@/components/Navbar'
import BlogContext from '@/lib/BlogContext'
import TopLoadingBar from '@/components/TopLoadingBar'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Adventurer-Grub',
  description: 'Blog:create,share,inspire,repeat',
}

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body >
        <Provider >
          <BlogContext>
            <TopLoadingBar/>
            <div>
            <Toaster/>
            </div>
        <Navbar/>
          <div>
        {children}
          </div>
          </BlogContext>
        </Provider>
      </body>
    </html>
  )
}
