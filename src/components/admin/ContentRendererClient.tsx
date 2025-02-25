'use client';
import { VideoPlayerSegment } from '@/components/VideoPlayerSegment';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { pipTrigger } from '@/store/atoms/trigger';
import { NotionRenderer } from '@/components/NotionRenderer';
import ResizeBar from '@/components/ResizeBar';
import { Button } from '@/components/ui/button';
import VideoContentChapters from '@/components/VideoContentChapters';

export const ContentRendererClient = ({
  metadata,
  content,
  nextContent,
}: {
  nextContent: {
    id: number;
    type: string;
    title: string;
  } | null;
  metadata: any;
  content: {
    type: 'video' | 'appx';
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    markAsCompleted: boolean;
    appxVideoId?: string;
    appxCourseId?: string;
  };
}) => {
  const [showChapters, setShowChapters] = useState(
    metadata?.segments?.length > 0,
  );

  const  setPipTrigger = useSetRecoilState(pipTrigger);

  const [isDualView, setIsDualView]= useState(false);

  const searchParams = useSearchParams();
  const screenWidth = useRef<number>(1000);

  const router = useRouter();

    const [width, setWidth] = useState<number>(screenWidth.current * 0.5);

  //@ts-ignore
  const [quality, setQuality] = useState<string>(
    searchParams.get('quality') ?? '1080',
  );

  if (!metadata) {
    return <div>Loading</div>;
  }

  const mpdUrl = metadata?.[quality || '1080'] || '';

  const source = useMemo(() => {
    if (mpdUrl.endsWith('.mpd')) {
      return {
        src: mpdUrl,
        type: 'application/dash+xml',
        keySystems: {
          'com.widevine.alpha':
            'https://widevine-dash.ezdrm.com/proxy?pX=288FF5&user_id=MTAwMA==',
        },
      };
    } else if (mpdUrl.endsWith('.m3u8')) {
      return {
        src: mpdUrl,
        type: 'application/x-mpegURL',
      };
    }
    return {
      src: mpdUrl,
      type: 'video/mp4',
    };
  }, [mpdUrl]);

  const toggleShowChapters = () => {
    setShowChapters((prev) => !prev);
  };

  const isResized = useRef(false);

  useEffect(() => {
    screenWidth.current = window.innerWidth;
    const minWidth = screenWidth.current * 0.1; // 10% of screen width
    const maxWidth = screenWidth.current * 0.65; // % of screen width
    const defaultWidth = screenWidth.current * 0.5; // 50% of screen width
  
    console.log(defaultWidth,maxWidth, minWidth);
    // window.addEventListener('touchstart', (e) => {
    //   if (!isResized.current) {
    //     return;
    //     }

    //   setWidth((previousWidth) => {
    //     const newWidth = previousWidth + e.touches[0].clientX;

    //     if (newWidth <= minWidth) {
    //         setPipTrigger(true);
    //         return minWidth;
    //     } else if (newWidth >=maxWidth) {
    //       setIsDualView(false);
    //       isResized.current=false;
    //     }
        
    //     const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;
        
    //     return isWidthInRange ? newWidth : previousWidth;
    //     });
    // });

    window.addEventListener('mousemove', (e) => {
      if (!isResized.current) {
        return;
        }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX/2;

        if (newWidth < minWidth) {
            setPipTrigger(true);
            return minWidth + 25;
        } else if (newWidth >=maxWidth) {
          setIsDualView(false);
          isResized.current=false;
        }
        
        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;
        
        return isWidthInRange ? newWidth : previousWidth;
        });
    });

    window.addEventListener("mouseup", () => {
      isResized.current = false;
      });

     return () => {
//cleanups
     };
  }, []);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col">
      <div className="grid grid-cols-[max-content_auto] min-w-full h-full lg:min-h-[70vh] w-full relative">

         < div
  className={`h-full flex flex-row min-w-full w-full`}
  style={isDualView ? { width: `${width /16}rem` } : { width: '100%'}} 
> 
<div className=' w-full lg:w-[1280px]'>

          <VideoPlayerSegment
          setQuality={setQuality}
          contentId={content.id}
          subtitles={metadata.subtitles}
          thumbnails={[]}
          appxVideoId={content.appxVideoId}
          appxCourseId={content.appxCourseId}
          segments={metadata?.segments || []}
          videoJsOptions={{
            playbackrates: [0.5, 1, 1.25, 1.5, 1.75, 2],
            controls: true,
            fluid: true,
            html5: {
              vhs: {
                overridenative: true,
              },
            },
            thumbnail: metadata.thumbnail || false, // data.isComposite ? data.thumbnails[0] : null,
            aspectRatio: '16:9',
            isComposite: true,
            height: 720,
            width: 1280,
            delta: 30,
            autoplay: true,
            responsive: true,
            sources: [source],
          }}
          onVideoEnd={() => { }}
        />
</div>

        {isDualView && <ResizeBar isResized={isResized} />}
      </div>
    {isDualView && (<div className='w-full flex flex-col h-full '>
          {metadata.slidesType === "NOT_NOTION" && <iframe src='https://projects.100xdevs.com'
          name='slides_frame'
           className='w-full h-full overflow-hidden'
           loading='lazy'></iframe> }
           
              {metadata.slidesType === "NOTION" && <NotionRenderer id={metadata.slides} /> 
              } 
           </div> 
)}

          </div>
        <div className="flex flex-col gap-4 rounded-xl bg-primary/5 p-4">
          <div className="flex w-full flex-col justify-between gap-2 md:flex-row ">
            <h2 className="line-clamp-2 text-wrap text-2xl font-extrabold capitalize tracking-tight text-primary md:text-3xl">
              {content.title}
            </h2>
            {metadata.slides ? (
              <div className='flex gap-2'>
              
                 <Link href={`${metadata.slidesType === "NOTION" ? (new URL(metadata.slides, 'https://notion.com/')) : metadata.slides }`} target="_blank"  >
                <Button className="gap-2">Lecture Slides in New Tab</Button>
              </Link>

{!isDualView ? (
  <>
    {metadata.slidesType === "NOT_NOTION" ? (
      <Link href={metadata.slides} target="slides_frame">
        <Button className={'gap-2'} onClick={() => setIsDualView(view => !view)}>Lecture Slides</Button>
      </Link>
    ) : (
      <Button className={'gap-2'} onClick={() => setIsDualView(view => !view)}>Lecture Slides</Button>
    )}
  </>
) : (
  <Button className={'gap-2 bg-red-700 hover:bg-red-800'} onClick={() => setIsDualView(view => !view)}>Close</Button>
)}
             
              </div>
            ) : null}
          </div>

          {!showChapters && metadata.segments?.length > 0 && (
            <button
              className="flex w-fit items-center gap-2"
              onClick={() => {
                toggleShowChapters();
              }}
            >
              <p>Chapters</p>
              {showChapters ? (
                <>
                  <ChevronUp className="size-5 text-neutral-500" />
                </>
              ) : (
                <>
                  <ChevronDown className="size-5 text-neutral-500" />
                </>
              )}
            </button>
          )}

          {showChapters && (
            <VideoContentChapters
              segments={metadata?.segments}
              onCancel={toggleShowChapters}
            />
          )}
        </div>
        {nextContent ? (
          <Button
            size={'lg'}
            onClick={() => {
              const originalPath = window.location.pathname;
              const parts = originalPath.split('/');
              parts.pop();
              parts.push(nextContent.id.toString());
              const newPath = parts.join('/');
              router.push(newPath);
            }}
          >
            {nextContent.title}
          </Button>
        ) : null}
      </div>
    </div>
  );
};
