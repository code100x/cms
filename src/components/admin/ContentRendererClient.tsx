'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { VideoPlayerSegment } from '@/components/VideoPlayerSegment';
import VideoContentChapters from '../VideoContentChapters';
import { Presentation } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

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
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full justify-between gap-4">
        <div className="flex w-full flex-col gap-4">
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
          <div className="flex justify-between">
            <h2 className="text-xl font-bold capitalize tracking-tighter text-primary md:text-3xl">
              {content.title}
            </h2>

            <div className="">
              {metadata.slides ? (
                <div className="flex flex-row gap-2 md:flex-row">
                  <Link href={metadata.slides} target="_blank">
                    <Button size={'lg'} className="gap-2">
                      <Presentation size={18} />
                      Lecture Slides
                    </Button>
                  </Link>
                </div>
              ) : null}
              {!showChapters && metadata.segments?.length > 0 && (
                <Button
                  size={'lg'}
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
              </Button>{' '}
            </div>
          ) : null}
        </div>
        {showChapters && (
          <div className="">
            <VideoContentChapters
              segments={metadata?.segments}
              onCancel={toggleShowChapters}
            />
          </div>
        )}
      </div>
    </div>
  );
};
