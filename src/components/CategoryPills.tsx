import { ChevronLeft, ChevronRight } from "lucide-react"
import Button from "./Button"
import { useEffect, useRef, useState } from "react"


type categoryProps = {
    categories:string[],
    selectedcategory:string,
    onSelect:(category:string)=>void
}

const TranslateAmount = 200

function CategoryPills({categories,selectedcategory,onSelect}:categoryProps){
   const [translate,setTranslate] = useState(0)
   const [leftArrowVisible,setLeftArrowVisible] = useState(true)
   const [rightArrowVisible,setRightArrowVisible] = useState(true)
   console.log("translate-----",translate)

   const containerRef = useRef<HTMLDivElement>(null)

   useEffect(()=>{

    if(containerRef.current == null) return

    const resizeObserver = new ResizeObserver((entries)=>{ //The ResizeObserver() interface in JavaScript is a web API that allows you to monitor changes in the dimensions of an element and deliver notifications to the observer whenever those changes occur.
       const container = entries[0]?.target
       if(container == null) return 

       setLeftArrowVisible(translate > 0)
       setRightArrowVisible(translate + container.clientWidth < container.scrollWidth)


    })

    resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()

   },[translate,categories])

    return<>
     <div ref={containerRef} className="overflow-x-hidden relative">

        <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style={{transform:`translateX(-${translate}px)`}}>
           {categories.map((elem)=>( <Button onClick={()=> onSelect(elem)} variant={selectedcategory == elem ? "dark": "default"} className="px-3 py-1 rounded-lg whitespace-nowrap">
                {elem}
            </Button>))}
        </div>

      { leftArrowVisible && <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
            <Button onClick={()=>{
                setTranslate((current)=>{
                   const newTranslate = current- TranslateAmount
                   if(newTranslate <= 0){ 
                    return 0
                }
                   return newTranslate
                })
            }} variant={"ghost"} size={"icon"} className="h-full aspect-square w-auto" >
            <ChevronLeft/>
            </Button>
        </div>}

      { rightArrowVisible && <div className="absolute flex justify-end right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full">
            <Button onClick={()=>{
                setTranslate((current)=>{
                    if(containerRef.current == null){
                        return current
                    }
                    const newTranslate = current + TranslateAmount
                    const edge = containerRef.current.scrollWidth
                    const width = containerRef.current.clientWidth
                    console.log("edge--",edge)
                    console.log("width--",width)
                    if(newTranslate + width >= edge){
                        return edge - width
                    }
                    return newTranslate

                 
                })
            }} variant={"ghost"} size={"icon"} className="h-full aspect-square w-auto" >
            <ChevronRight/>
            </Button>
        </div>}
     
     </div>
    </>
}

export default CategoryPills