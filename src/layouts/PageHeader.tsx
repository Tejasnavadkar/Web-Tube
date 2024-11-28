
import logo from "../assets/Logo.png"
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react"
import Button from "../components/Button"
import { useState } from "react"

function PageHeader(){
    const [showSearchbar,setShowSearchbar] = useState(false)

    return <>
    
    <div className="w-full flex gap-10 lg:gap-20 justify-between pt-2 mb-6 px-4 ">
       
        <div className={`flex gap-4 items-center flex-shrink-0 ${showSearchbar ? "hidden" : "flex" } `}>
            <Button variant="ghost" size="icon">
                <Menu/>
            </Button>
            <a href="/">
              <img className="h-6" src={logo} alt="" />
            </a>
        </div>
        <form className={` gap-4 flex-grow justify-center ${showSearchbar ? "flex" : "hidden md:flex"}`}>
            
       {showSearchbar && (<div className="flex h-full justify-center items-center">
         <Button onClick={()=>{setShowSearchbar(false)}} variant={"ghost"} size={"icon"}>
        <ArrowLeft/>
        </Button>
         </div> )}

            <div className="flex flex-grow max-w-[600px]">
              <input type="search" placeholder="Search" className="w-full rounded-l-full border border-secondary-border shadow-inner shadow-secondary px-4 py-2 text-lg focus:border-blue-500 outline-none " />
               <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0">
                <Search/>
               </Button>
            </div>
            <Button type="button" size={"icon"} className="flex-shrink-0">
                <Mic/>
            </Button>
        </form>

      

        <div className={`flex flex-shrink-0 md:gap-2 ${showSearchbar ? "hidden" : "flex"} `}>
        <Button onClick={()=>{setShowSearchbar(true)}} variant={"ghost"} size={"icon"} className="md:hidden">
                <Search/>
            </Button>
            <Button variant={"ghost"} size={"icon"} className="md:hidden">
                <Mic/>
            </Button>
            <Button variant={"ghost"} size={"icon"}>
                <Upload/>
            </Button>
            <Button variant={"ghost"} size={"icon"}>
                <Bell/>
            </Button>
            <Button variant={"ghost"} size={"icon"}>
                <User/>
            </Button>
        </div>
    </div>
    
    </>
}

export default PageHeader