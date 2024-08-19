'use client';
import { useSearchParams, useRouter } from 'next/navigation';
// import { QualitySelector } from '../QualitySelector';
import { VideoPlayerSegment } from '@/components/VideoPlayerSegment';
import VideoContentChapters from '../VideoContentChapters';
import { useMemo, useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import { Check, ChevronLast, Milestone, Presentation, X } from "lucide-react"

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
    createdAt?: Date | null;
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
  };

  const neitherChapterNorNext = !(metadata.segments?.length > 0) && !nextContent

  return (
    <div className="flex flex-col items-start gap-2 semi:flex-row">
      <div className="w-full flex-1">
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
        <div className="mb-2 border-yellow-500 flex flex-col justify-between">
          <div className=' flex items-center pb-4 mx-2 border-b justify-between'>
            <div className="w-[70%] text-gray-900  dark:text-white">
              <p className='text-2xl font-semibold'>{content.title}</p>
              <p className='text-sm text-gray-500'>Posted at : {content?.createdAt?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
            </div>

            <div className='flex w-[30%] items-center justify-end gap-4'>
              <button
                className={`my-4 rounded flex items-center gap-2 ${contentCompleted ? 'border-dashed border-[#3259E8] text-[#4E7AFF] bg-[#4e7aff12]' : 'bg-[#3259E8]'} border p-2 text-sm font-semibold text-white`}
                disabled={loadingMarkAs}
                onClick={handleMarkCompleted}
              >
                {contentCompleted ? <X size={18} /> : <Check size={18} />}
                <p className='hidden md:block'>
                  {contentCompleted ? 'Mark as Incomplete' : 'Mark as completed'}
                </p>
              </button>

              {metadata.slides ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    gap: '10px',
                  }}
                >
                  <a href={metadata.slides} target="_blank">
                    <button className="rounded text-sm font-semibold flex items-center gap-2 bg-[#3259E8] p-2 text-white hover:bg-blue-700">
                      <Presentation size={18} />
                      <p className='hidden md:block'>Lecture Slides</p>
                    </button>
                  </a>
                </div>
              ) : null}

            </div>
          </div>

          <div className={`flex py-4 mx-2 ${neitherChapterNorNext ? 'border-none' : 'border-b'} justify-between`}>
            {/* <QualitySelector /> */}

            {!showChapters && metadata.segments?.length > 0 && (
              <button
                className="rounded flex items-center gap-2 text-sm mx-2 hover:underline font-semibold dark:text-white"
                onClick={() => {
                  scrollTo({ top: 0, behavior: 'smooth' });
                  toggleShowChapters();
                }}
              >
                <Milestone size={18} />
                <p>View All Chapters</p>
              </button>
            )}

            {nextContent ? (
              <div className="flex flex-row-reverse">
                <button
                  className="ml-4 flex items-center text-sm gap-2 rounded bg-[#3259E8] px-4 py-2 font-semibold text-white hover:bg-blue-700"
                onClick={() => {
                  const originalPath = window.location.pathname;
                  const parts = originalPath.split('/');
                  parts.pop();
                  parts.push(nextContent.id.toString());
                  const newPath = parts.join('/');
                  router.push(newPath);
                }}
                >
                  <p>{nextContent.title}</p>
                  <ChevronLast size={18} />
                </button>{' '}
              </div>
            ) : null}
          </div>
        </div>

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
