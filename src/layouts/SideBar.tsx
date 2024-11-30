import { ChevronDown, ChevronUp, Clapperboard, Divide, Home, Library, Repeat,History, PlaySquare, Clock } from "lucide-react"
import React, { Children, ElementType, ReactNode, useState } from "react"
import Button, { buttonStyles } from "../components/Button"
import { twMerge } from "tailwind-merge"


function SideBar(){

    return <>
    
    
        <aside className=" lg:hidden overflow-y-auto scrollbar-hidden flex flex-col ml-1">
        <SmallSidebar Icon={Home} title={"Home"} Url={""}/>
        <SmallSidebar  Icon={Repeat} title={"Repeat"}  Url={""}/>
        <SmallSidebar  Icon={Clapperboard} title={"Clapperboard"}  Url={""}/>
        <SmallSidebar  Icon={Library} title={"Library"}  Url={""}/>
        </aside>
    
        <aside className="w-56 border border-red-950 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-2 ">
            <LargeSideBarSection visibleItemCount={1} >
                <LargeSideBarItems Icon={Home} isActive={true} title={"Home"} Url={""} />
                <LargeSideBarItems Icon={Clapperboard} isActive={false} title={"Subscription"} Url={""} />    
            </LargeSideBarSection>
            <hr/> 
            <LargeSideBarSection>
            <LargeSideBarItems Icon={Library} isActive={false} title={"Library"} Url={""} />
            <LargeSideBarItems Icon={History} isActive={false} title={"History"} Url={""} />
            <LargeSideBarItems Icon={PlaySquare} isActive={false} title={"Your Videos"} Url={""} />
            <LargeSideBarItems Icon={Clock} isActive={false} title={"Watch Later"} Url={""} />
            </LargeSideBarSection>
        </aside>
    
    </>
History
}

export default SideBar

type SmallSidebarProps ={
    Icon:ElementType, //becoz its an element from lucid react
    title:string,
    Url:string

}

function SmallSidebar({Icon,title,Url}:SmallSidebarProps){

    return <>

    <a href={Url} className={twMerge(buttonStyles({variant:"ghost"}),"py-2 px-1 flex flex-col items-center gap-1")}>
      <Icon className =" w-6 h-6"/>
      <div className="text-sm">{title}</div> 
    </a>
    
    </>
}

type LargeSideBarSectionProps ={
    children:ReactNode,
    title?:string,
    visibleItemCount:number
}

function LargeSideBarSection({children,title,visibleItemCount = Number.POSITIVE_INFINITY}:LargeSideBarSectionProps){ // bydefault infinite

    const [isExpanded, setIsExpanded] = useState(false)
    const arraychildren = Children.toArray(children).flat()
    const showExpandbleButton = arraychildren.length > visibleItemCount
    const visibleChildren = isExpanded ? arraychildren : arraychildren.slice(0,visibleItemCount)
    const buttonIcon = isExpanded ? ChevronUp : ChevronDown

    return <>
    {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
    {visibleChildren}
    {/* {showExpandbleButton && <div onClick={()=>{setIsExpanded(e=>!e)}} className="">{ isExpanded? <div className="flex gap-2 cursor-pointer"><ChevronUp/> Show Less</div> : <div className="flex gap-2 cursor-pointer"><ChevronDown/> Show More</div> }</div> } */}
    {showExpandbleButton && <Button onClick={()=>{setIsExpanded(e=>!e)}} variant={"ghost"} className="flex gap-2 items-center" >
       <span> {React.createElement(buttonIcon)}</span>
        <span>{isExpanded ? "Show Less" : "Show More"}</span>
        
        </Button>

    }
    </>
}

type LargeSideBarItemsProp ={
    Icon:ElementType,
    title:string,
    Url:string
    isActive?:boolean
}

function LargeSideBarItems({Icon,title,Url,isActive=false}:LargeSideBarItemsProp){
    // const [isClicked,setIsClicked] = useState(false)
    return<>
    <div>
        <a href={Url} className={twMerge(buttonStyles({variant:"ghost"}), `flex gap-4 w-full items-center rounded-lg p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary-Default": undefined}`)} >
            <Icon h-6 w-6 />
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        </a>
    </div>
    
    </>
}

