'use client';
import { useSearchParams, useRouter } from 'next/navigation';
// import { QualitySelector } from '../QualitySelector';
import { VideoPlayerSegment } from '@/components/VideoPlayerSegment';
import VideoContentChapters from '../VideoContentChapters';
import { useMemo, useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import { Button } from '../ui/button';
import { Tv } from 'lucide-react';

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
    <div className="flex flex-col items-start gap-2 semi:flex-row">
      <div className="w-full flex-1 p-2 md:p-6">
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
        <div className="mb-2 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <div>
            <div className="text-xl font-bold capitalize text-gray-900 dark:text-white">
              {content.title}
            </div>
            <div className="text-slate-400 dark:text-slate-500">
              {content.description}
            </div>
          </div>

          <div className="flex gap-2">
            <Button disabled={loadingMarkAs} onClick={handleMarkCompleted}>
              {contentCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
            </Button>
            {/* <QualitySelector /> */}
            {metadata.slides ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  gap: '10px',
                }}
              >
                <a href={metadata.slides} target="_blank">
                  <Button className="flex gap-2">
                    <Tv className="w-5 rotate-180" /> Lecture Slides
                  </Button>
                </a>
              </div>
            ) : null}
            {!showChapters && metadata.segments?.length > 0 && (
              <Button
                onClick={() => {
                  scrollTo({ top: 0, behavior: 'smooth' });
                  toggleShowChapters();
                }}
              >
                View All Chapters
              </Button>
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
