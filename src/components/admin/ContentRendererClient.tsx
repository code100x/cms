'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { VideoPlayerSegment } from '@/components/VideoPlayerSegment';
import VideoContentChapters from '../VideoContentChapters';
import { Presentation } from 'lucide-react';
import { useMemo, useState } from 'react';

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
  const [showChapters, setShowChapters] = useState(false);

  const searchParams = useSearchParams();
  console.log(showChapters);
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap justify-between gap-4 xl:flex-nowrap">
        <div className="w-full">
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
            onVideoEnd={() => {}}
          />
          <div className="flex justify-between">
            <div>
              <div className="text-bold text-2xl tracking-normal text-gray-900 dark:text-white">
                {content.title}
              </div>
            </div>
            <div className="flex items-center">
              {metadata.slides ? (
                <div className="flex flex-row-reverse gap-2">
                  <a href={metadata.slides} target="_blank">
                    <button className="mb-2 me-2 flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                      <Presentation size={18} />
                      Lecture Slides
                    </button>
                  </a>
                </div>
              ) : null}
              {!showChapters && (
                <button
                  className="mb-2 me-2 flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
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
        <div className="w-full xl:w-auto">
          {showChapters && (
            <VideoContentChapters
              segments={metadata?.segments}
              onCancel={toggleShowChapters}
            />
          )}
        </div>
      </div>
    </div>
  );
};
