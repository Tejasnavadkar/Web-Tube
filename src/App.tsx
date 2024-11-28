
import './App.css'
import CategoryPills from './components/CategoryPills'
import PageHeader from './layouts/PageHeader'

function App() {
 

  return (
    <>
      <div className='max-h-screen max-w-full flex flex-col'>
        <PageHeader/>
        <div className=' grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto'>
          <div>Sidebar</div>
          <div className='border border-red-600 sticky top-0 bg-white z-10 pb-4'>
             <CategoryPills/>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App
