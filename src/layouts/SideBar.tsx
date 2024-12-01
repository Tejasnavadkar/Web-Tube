import { ChevronDown, ChevronUp, Clapperboard, Divide, Home, Library, Repeat,History, PlaySquare, Clock, PlayIcon, ListVideo, Flame,
    ShoppingBag,
    Music2,
    Film,
    Radio,
    Gamepad2,
    Newspaper,
    Trophy,
    Lightbulb,
    Shirt,
    Podcast, } from "lucide-react"
import React, { Children, ElementType, ReactNode, useState } from "react"
import Button, { buttonStyles } from "../components/Button"
import { twMerge } from "tailwind-merge"
import { playlists } from "../Data"
import { subscriptions } from "../Data"
import { useSidebarContext } from "../Context/SidebarContext"
import { PageheaderFirst } from "./PageHeader"



function SideBar(){
    const {isLargeOpen,isSmallOpen,close} =useSidebarContext()

    return <>
    
    
        <aside className={` hover:sidebar  sticky top-0  overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex"}`}>
        <SmallSidebar Icon={Home} title={"Home"} Url={""}/>
        <SmallSidebar  Icon={Repeat} title={"Repeat"}  Url={""}/>
        <SmallSidebar  Icon={Clapperboard} title={"Clapperboard"}  Url={""}/>
        <SmallSidebar  Icon={Library} title={"Library"}  Url={""}/>
        </aside>
        {isSmallOpen && <div onClick={close} className="lg:hidden bg-secondary-dark opacity-50 fixed inset-0 z-[999]" ></div>}
        <aside className={`hover:sidebar w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4  flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex": "lg:hidden" } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
            <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
            <PageheaderFirst/>
            </div>
            

            <LargeSideBarSection visibleItemCount={1} >
                <LargeSideBarItems IconOrimgUrl={Home} isActive={true} title={"Home"} Url={""} />
                <LargeSideBarItems IconOrimgUrl={Clapperboard} isActive={false} title={"Subscription"} Url={""} />    
            </LargeSideBarSection>

            <hr/> 
            <LargeSideBarSection visibleItemCount={5}>
            <LargeSideBarItems IconOrimgUrl={Library} isActive={false} title={"Library"} Url={""} />
            <LargeSideBarItems IconOrimgUrl={History} isActive={false} title={"History"} Url={""} />
            <LargeSideBarItems IconOrimgUrl={PlaySquare} isActive={false} title={"Your Videos"} Url={""} />
            <LargeSideBarItems IconOrimgUrl={Clock} isActive={false} title={"Watch Later"} Url={""} />
            {playlists.map((item)=>(<LargeSideBarItems IconOrimgUrl={ListVideo} title={item.name} key={item.id} Url={`/playlist?id=${item.id}`}/>))}
            </LargeSideBarSection>
            <hr/>

            <LargeSideBarSection>
                {subscriptions.map((item)=>(<LargeSideBarItems key={item.id} IconOrimgUrl={item.imgUrl} title={item.channelName} Url={`/@${item.id}`} />))}
            </LargeSideBarSection>
            <hr/>

            <LargeSideBarSection title="Explore">
          <LargeSideBarItems
            IconOrimgUrl={Flame}
            title="Trending"
            Url="/trending"
          />
          <LargeSideBarItems
            IconOrimgUrl={ShoppingBag}
            title="Shopping"
            Url="/shopping"
          />
          <LargeSideBarItems IconOrimgUrl={Music2} title="Music" url="/music" />
          <LargeSideBarItems
            IconOrimgUrl={Film}
            title="Movies & TV"
            Url="/movies-tv"
          />
          <LargeSideBarItems IconOrimgUrl={Radio} title="Live" url="/live" />
          <LargeSideBarItems
            IconOrimgUrl={Gamepad2}
            title="Gaming"
            Url="/gaming"
          />
          <LargeSideBarItems IconOrimgUrl={Newspaper} title="News" url="/news" />
          <LargeSideBarItems
            IconOrimgUrl={Trophy}
            title="Sports"
            Url="/sports"
          />
          <LargeSideBarItems
            IconOrimgUrl={Lightbulb}
            title="Learning"
            Url="/learning"
          />
          <LargeSideBarItems
            IconOrimgUrl={Shirt}
            title="Fashion & Beauty"
            Url="/fashion-beauty"
          />
          <LargeSideBarItems
            IconOrimgUrl={Podcast}
            title="Podcasts"
            Url="/podcasts"
          />
        </LargeSideBarSection>

        </aside>
    
    </>
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

type LargeSideBarItemssProp ={
    IconOrimgUrl: ElementType | string,
    title:string,
    Url:string
    isActive?:boolean
}

function LargeSideBarItems({IconOrimgUrl,title,Url,isActive=false}:LargeSideBarItemssProp){
    // const [isClicked,setIsClicked] = useState(false)
    return<>
    <div>
        <a href={Url} className={twMerge(buttonStyles({variant:"ghost"}), `flex gap-4 w-full items-center rounded-lg p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary-Default": undefined}`)} >
           { typeof IconOrimgUrl !== "string" ? (<IconOrimgUrl h-6 w-6 />) :(<img src={IconOrimgUrl} className="h-6 w-6 rounded-full" />) }
            
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        </a>
    </div>
    
    </>
}

