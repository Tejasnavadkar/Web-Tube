
import './App.css'
import CategoryPills from './components/CategoryPills'
import PageHeader from './layouts/PageHeader'
import { categories,videos } from './Data'
import { useState } from 'react'
import VideoGrid from './components/VideoGrid'
import SideBar from './layouts/SideBar'


function App() {
  const [selectedcategory, setSelectedCategory] = useState(categories[0])


  return (
    <>
      <div className='max-h-screen max-w-full flex flex-col'>
        <PageHeader />
        <div className=' grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
          <div>
            <SideBar/>
          </div>
          <div className='overflow-x-hidden  px-8 pb-4'>
            <div className=' sticky top-0 bg-white z-10 pb-4'>
              <CategoryPills categories={categories} selectedcategory={selectedcategory} onSelect={setSelectedCategory}
              />
            </div>
            <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'> {/*minimum 300px and max 1fr*/}
              {videos.map((elem)=> <VideoGrid key={elem.id} {...elem} />)}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
