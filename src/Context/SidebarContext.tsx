import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type SidebarProviderProps={

    children:ReactNode

}

type sidebarcontextprop={
    isLargeOpen:boolean
    isSmallOpen:boolean
    toggle:()=>void
    close:()=>void
}

const SidebarContext = createContext<sidebarcontextprop | null>(null)

export function useSidebarContext(){
    const value = useContext(SidebarContext)

    if(value == null) throw Error("cant use outside of sidebarcontextprovider")
    
    return value
}


export function SidebarProvider({children}:SidebarProviderProps){

    function isSmallScreen():boolean{   // to determine is screen is small screen or not it returns boolean
       
        return window.innerWidth < 1024
    }
    const [isLargeOpen,setIsLargeOpen] = useState(true)
    const [isSmallOpen,setIsSmallOpen] = useState(false)
  
    useEffect(()=>{
        const helper = () =>{
            if(!isSmallScreen()){
                setIsSmallOpen(false)
            }
        }
        window.addEventListener("resize",helper)
       return ()=> window.removeEventListener("resize",helper)
    
       
    },[])
    function toggle(){
        if(isSmallScreen()){
            setIsSmallOpen(e=>!e)  // if screen small then setIsSmall 
        }else{
            setIsLargeOpen(e=>!e)  // if screen large then setIsSmall 
        }
    }
    function close(){
        if(isSmallScreen()){
            setIsSmallOpen(false)
        }else{
            setIsLargeOpen(false)
        }
    }

   return <SidebarContext.Provider value={{
    isLargeOpen,
    isSmallOpen,
    toggle,
    close
   }}>
    {children}
</SidebarContext.Provider>
}

