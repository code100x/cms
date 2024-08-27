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

  return (
    <div className="flex flex-col justify-center gap-4 xl:flex-row">
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
          onVideoEnd={() => {}}
        />
        <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <div className="text-bold text-xl capitalize tracking-normal text-gray-900 dark:text-white">
            {content.title}
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            {/* <QualitySelector /> */}
            {metadata.slides ? (
              <div
                style={{
                  display: 'flex items-center justify-center',
                  flexDirection: 'row-reverse',
                  gap: '10px',
                }}
              >
                <a href={metadata.slides} target="_blank">
                  <button className="flex w-full items-center gap-2 whitespace-nowrap rounded-sm bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                    <Presentation size={18} />
                    Lecture Slides
                  </button>
                </a>
              </div>
            ) : null}
            {!showChapters && metadata.segments?.length > 0 && (
              <button
                className="w-full whitespace-nowrap rounded bg-blue-700 px-4 py-2.5 text-sm font-bold font-medium text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
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

      {true && (
        <VideoContentChapters
          segments={metadata?.segments}
          onCancel={toggleShowChapters}
        />
      )}
    </div>
  );
};
