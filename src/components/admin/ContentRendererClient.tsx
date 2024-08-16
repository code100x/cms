'use client';
import { useSearchParams, useRouter } from 'next/navigation';
// import { QualitySelector } from '../QualitySelector';
import { VideoPlayerSegment } from '@/components/VideoPlayerSegment';
import VideoContentChapters from '../VideoContentChapters';
import { useMemo, useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';

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

  return (
    <div className="flex flex-col items-start gap-2 px-3 semi:flex-row">
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
        <div className="mb-2 flex justify-between">
          {/* <div><QualitySelector /></div> */}
        </div>
        <div className="flex flex-col items-start justify-between rounded-lg py-4 dark:text-white md:flex-row">
          <div className="py-1">
            <div className="mb-1 text-3xl font-semibold">{content.title}</div>
            {/* <div className="text-md text-gray-400">Posted on: 10 Aug 2024</div> */}
          </div>

          <div className="ml-auto mt-4 flex flex-col items-center gap-4 md:mt-0 md:flex-row">
            <div className="flex items-center gap-4">
              <button
                className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                disabled={loadingMarkAs}
                onClick={handleMarkCompleted}
              >
                {contentCompleted ? 'Mark as Incomplete' : 'Mark as completed'}
              </button>

              {metadata.slides && (
                <a href={metadata.slides} target="_blank">
                  <button className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    <svg
                      width="16"
                      height="17"
                      className="mr-2 h-5 w-5"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.666016 2.87467C0.666016 2.50648 0.964492 2.20801 1.33268 2.20801H14.666C15.0342 2.20801 15.3327 2.50648 15.3327 2.87467C15.3327 3.24286 15.0342 3.54134 14.666 3.54134H1.33268C0.964492 3.54134 0.666016 3.24286 0.666016 2.87467Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.00065 2.20801C2.36884 2.20801 2.66732 2.50648 2.66732 2.87467V10.208C2.66732 10.3848 2.73756 10.5544 2.86258 10.6794C2.9876 10.8044 3.15717 10.8747 3.33398 10.8747H12.6673C12.8441 10.8747 13.0137 10.8044 13.1387 10.6794C13.2637 10.5544 13.334 10.3848 13.334 10.208V2.87467C13.334 2.50648 13.6325 2.20801 14.0007 2.20801C14.3688 2.20801 14.6673 2.50648 14.6673 2.87467V10.208C14.6673 10.7384 14.4566 11.2471 14.0815 11.6222C13.7065 11.9973 13.1978 12.208 12.6673 12.208H3.33398C2.80355 12.208 2.29484 11.9973 1.91977 11.6222C1.5447 11.2471 1.33398 10.7384 1.33398 10.208V2.87467C1.33398 2.50648 1.63246 2.20801 2.00065 2.20801Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5286 11.0703C7.78894 10.8099 8.21106 10.8099 8.4714 11.0703L11.8047 14.4036C12.0651 14.6639 12.0651 15.0861 11.8047 15.3464C11.5444 15.6068 11.1223 15.6068 10.8619 15.3464L8 12.4845L5.13807 15.3464C4.87772 15.6068 4.45561 15.6068 4.19526 15.3464C3.93491 15.0861 3.93491 14.6639 4.19526 14.4036L7.5286 11.0703Z"
                        fill="white"
                      />
                    </svg>
                    Lecture Slides
                  </button>
                </a>
              )}
            </div>

            {!showChapters && metadata.segments?.length > 0 && (
              <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
              className="ml-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
