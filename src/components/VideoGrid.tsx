import { useEffect, useRef, useState } from "react"
import formateDuration from "../utils/formateDuration"
import { FormatTimeAgo } from "../utils/FormatTimeAgo"

type VideoProp = {
    id:string,
    title:string,
    channel:{
        id:string,
        name:string,
        profileUrl:string
    },
    views:number,
    postedAt:Date,
    duration:number,
    thumbnailUrl:string,
    videoUrl:string
}

const VIEWS_FORMATTER = new Intl.NumberFormat(undefined,{
    notation:"compact"
})

function VideoGrid({  
    id,
    title,
    channel,
    views,
    postedAt,
    duration,
    thumbnailUrl,
    videoUrl,}:VideoProp){

        const videoRef = useRef<HTMLVideoElement>(null)
        const [isVideoPlaying,setIsVideoPlaying] = useState(false)

        useEffect(()=>{
          if(videoRef.current == null) return
          if(isVideoPlaying){
            videoRef.current.currentTime = 0 // when hover again video play again fron start
            videoRef.current.play()
          }else{
            videoRef.current.pause()
          }


        },[isVideoPlaying])
        

    return <>

    <div className="flex flex-col gap-2" onMouseEnter={()=>{setIsVideoPlaying(true)}} onMouseLeave={()=>{setIsVideoPlaying(false)}}>
      <a href={`/watch?v=${id}`} className="relative aspect-video" >
      <img src={thumbnailUrl} className={`h-full w-full object-cover transition-[border-radius] duration-200 ${isVideoPlaying ? "rounded-none" : "rounded-xl"} `} alt="" />
      
      <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary-Default rounded px-0.5 ">
        {formateDuration(duration)}  {/* here create another component that convert duration from milisecond to proper format using Intl()(hour:minut:second)  */}
      </div>
      <video className={`absolute inset-0 block object-cover h-full  transition-opacity duration-200  ${isVideoPlaying ? "opacity-100 delay-200": "opacity-0"} `} 
      ref={videoRef}
      src={videoUrl}
      muted
      playsInline
      >
      </video>
      </a>

      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0 ">
            <img src={channel.profileUrl} className="h-12 w-12 rounded-full" alt="" />

        </a>
        <div className="flex flex-col">
            <a href={`/watch?v=${id}`} className="font-bold">
            {title}
            </a>
            <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
                {channel.name}
            </a>
            <div className="text-secondary-text text-sm">
              {VIEWS_FORMATTER.format(views)} views.{FormatTimeAgo(postedAt)}
            </div>
        </div>
      </div>
    </div>
      
    </>

}

export default VideoGrid