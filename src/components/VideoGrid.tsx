

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

function VideoGrid({  
    id,
    title,
    channel,
    views,
    postedAt,
    duration,
    thumbnailUrl,
    videoUrl,}:VideoProp){

    return <>

    <div className="flex flex-col gap-2">
      <a href={`/watch?v=${id}`} className="relative aspect-video" >
      <img src={thumbnailUrl} className="h-full w-full object-cover rounded-xl " alt="" />
      
      <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary-Default rounded px-0.5 ">
        {duration}
      </div>
      </a>
    </div>
      
    </>

}

export default VideoGrid