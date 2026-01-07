'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { LastWatchedVideoI } from "@/lib/lastWatchedtype";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export function LastWatchedVideo({courseId}:{courseId:number}){
  const [loading, setLoading]=useState(true);
  const [videoInfo,setVideoInfo]=useState<LastWatchedVideoI>(null);
  const {data: session, status} = useSession();
  const router=useRouter();

  useEffect(()=>{
    if(status === 'loading' || !session?.user) {
      setLoading(false);
      return;
    }

    async function fetchVideoInfo(){
      setLoading(true);
      try{
        const response=await axios.get(`/api/user/last-watched?courseId=${courseId}`);
        if(response.status===200){
          setVideoInfo(response.data.videoInfo as LastWatchedVideoI)
        }
        else{
          setVideoInfo(null);
        }
      }
      catch(err){
        console.error('Error fetching last watched video:', err);
        setVideoInfo(null);
      }
      finally{
        setLoading(false);
      }
    }
    fetchVideoInfo();
  },[courseId, session, status]);

  if(loading || status === 'loading') {
    return null;
  }

  if(!videoInfo) {
    return null;
  }

  const handleClick = () => {
    const path = videoInfo.parentId 
      ? `/courses/${courseId}/${videoInfo.parentId}/${videoInfo.id}`
      : `/courses/${courseId}/${videoInfo.id}`;
    router.push(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <motion.div
        onClick={handleClick}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => ['Enter', ' '].includes(e.key) && handleClick()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="group relative flex cursor-pointer items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10"
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 transition-all duration-300 group-hover:bg-blue-500/30">
          <Play className="size-5 fill-blue-500 text-blue-500" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-blue-600 mb-0.5">
            Continue Watching
          </p>
          <h3 className="truncate text-sm font-medium text-muted-foreground">
            {videoInfo.title}
          </h3>
        </div>

        <div className="shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Play className="size-4 text-blue-500" />
        </div>
      </motion.div>
    </motion.div>
  );
}