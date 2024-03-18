'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
// import { QualitySelector } from '../QualitySelector';
import { VideoPlayerSegment } from '@/components/VideoPlayerSegment';
import VideoContentChapters from '../VideoContentChapters';
import { useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import { useRecoilState } from 'recoil';
import { markAsCompleteAtom } from '@/store/atoms/markAsComplete';

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
    type: 'video';
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    markAsCompleted: boolean;
  };
}) => {
  const [contentCompleted, setContentCompleted] = useState(
    content.markAsCompleted,
  );
  const [loadingMarkAs, setLoadingMarkAs] = useState(false);
  const [showChapters, setShowChapters] = useState(
    metadata?.segments?.length > 0,
  );
  const searchParams = useSearchParams();

  const router = useRouter();

  //@ts-ignore
  const [quality, setQuality] = useState<number>(
    searchParams.get('quality') | null,
  );

  if (!metadata) {
    return <div>Loading</div>;
  }

  const mpdUrl = metadata?.[quality || '1080'] || '';
  let source = {};

  if (mpdUrl.endsWith('.mpd')) {
    //@ts-ignore
    source = {
      src: mpdUrl,
      type: 'application/dash+xml',
      keySystems: {
        'com.widevine.alpha':
          'https://widevine-dash.ezdrm.com/proxy?pX=288FF5&user_id=MTAwMA==',
      },
    };
  } else if (mpdUrl.endsWith('.m3u8')) {
    //@ts-ignore
    source = {
      src: mpdUrl,
      type: 'application/x-mpegURL',
    };
  } else {
    //@ts-ignore
    source = {
      src: mpdUrl,
      type: 'video/mp4',
    };
  }
  const [currentPath] = useState(usePathname());
  const [markAsComplete , setMarkAsComplete] = useRecoilState(markAsCompleteAtom);
 
  const toggleShowChapters = () => {
    setShowChapters((prev) => !prev);
  };

  const handleMarkCompleted = async () => {
    setLoadingMarkAs(true);
    const data: any = await handleMarkAsCompleted(
      !contentCompleted,
      content.id,
    );

    if (data.contentId) {
      setContentCompleted((prev) => !prev);
    }
    setLoadingMarkAs(false);
    setMarkAsComplete({
      isValid: true,
      path: currentPath,
      isCompleted: contentCompleted
    });
  };
  return (
    <div className="flex gap-2 items-start flex-col lg:flex-row">
      <div className="flex-1 w-full">
        <VideoPlayerSegment
          setQuality={setQuality}
          contentId={content.id}
          subtitles={metadata.subtitles}
          thumbnails={[]}
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
            isComposite: true,
            height: 720,
            width: 1080,
            delta: 30,
            autoplay: true,
            responsive: true,
            sources: [source],
          }}
          onVideoEnd={() => {
            setContentCompleted(true);
          }}
        />
        <br />
        <div className="flex justify-between mb-2">
          <div>
            <div className="text-gray-900 dark:text-white font-bold text-2xl">
              {content.title}
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 my-4"
              disabled={loadingMarkAs}
              onClick={handleMarkCompleted}
            >
              {
                markAsComplete.isValid && markAsComplete.path === currentPath ? <DisplayMarkAsComplete isCompleted={markAsComplete?.isCompleted} /> : <DisplayMarkAsComplete isCompleted={contentCompleted} />
              }
              
            </button>
          </div>

          <div>
            {/* <QualitySelector /> */}
            <br />
            {metadata.slides ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  gap: '10px',
                }}
              >
                <a href={metadata.slides} target="_blank">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2">
                    Slides
                  </button>
                </a>
              </div>
            ) : null}
            {!showChapters && metadata.segments?.length > 0 && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2"
                onClick={() => {
                  scrollTo({ top: 0, behavior: 'smooth' });
                  toggleShowChapters();
                }}
              >
                View All Chapters
              </button>
            )}
          </div>
        </div>
        {nextContent ? (
          <div className="flex flex-row-reverse">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
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
            </button>{' '}
          </div>
        ) : null}
      </div>

      {showChapters && (
        <VideoContentChapters
          segments={metadata?.segments}
          onCancel={toggleShowChapters}
        />
      )}
    </div>
  );
};
export const DisplayMarkAsComplete = ({isCompleted} : {isCompleted : boolean | undefined}) => {
  return (
    isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'
  );
};
