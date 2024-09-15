'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { VideoPlayerSegment } from '@/components/VideoPlayerSegment';
import VideoContentChapters from '../VideoContentChapters';
import { Eye, EyeOff } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Separator } from '../ui/separator';

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
    <div className="flex w-full flex-col gap-2 lg:flex-row">
      <div className="flex w-full flex-col gap-2">
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
            width: 1280,
            delta: 30,
            autoplay: true,
            responsive: true,
            sources: [source],
          }}
          onVideoEnd={() => {}}
        />
        <div className="flex flex-col gap-4 rounded-xl bg-primary/5 p-4">
          <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
            <h2 className="line-clamp-2 text-wrap text-xl font-semibold capitalize tracking-tight text-primary md:text-2xl">
              {content.title}
            </h2>
            {metadata.slides ? (
              <Link href={metadata.slides} target="_blank">
                <Button className="gap-2">Lecture Slides</Button>
              </Link>
            ) : null}
          </div>

          <button
            className="flex w-fit items-center gap-2"
            onClick={() => {
              toggleShowChapters();
            }}
          >
            {showChapters ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
            <p className="text-sm font-medium">
              {showChapters ? 'Hide' : 'Show'} Chapters
            </p>
          </button>
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
      {/* Chapters */}
      {showChapters && (
        <div className="flex w-full flex-col rounded-xl bg-primary/5 lg:max-w-[35%] xl:max-w-[30%] 2xl:max-w-[25%]">
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-lg font-bold md:text-xl">Video Chapters</h3>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 overflow-y-auto py-4">
            {metadata.segments ? (
              <VideoContentChapters
                segments={metadata?.segments}
                onCancel={toggleShowChapters}
              />
            ) : (
              <div className="flex items-center justify-center">
                <p>No chapters found</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
