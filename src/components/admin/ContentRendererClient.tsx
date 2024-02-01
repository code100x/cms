'use client';
import { useSearchParams } from 'next/navigation';
import { QualitySelector } from '../QualitySelector';
import { VideoPlayerSegment } from '@/components/VideoPlayerSegment';
import { useRouter } from 'next/navigation';

export const ContentRendererClient = ({
  metadata,
  content,
  nextContent,
}: {
  nextContent: {
    id: number
    type: string
    title: string
  } | null
  metadata: any
  content: {
    type: 'video'
    id: number
    title: string
    thumbnail: string
    description: string
  }
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  //@ts-ignore
  const quality: '720' | '1080' | '360' | null = searchParams.get('quality');

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

  return (
    <div>
      <VideoPlayerSegment
        contentId={content.id}
        subtitles={metadata.subtitles}
        thumbnails={[]}
        segments={metadata.segments || []}
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
      />
      <br />
      <div className="flex justify-between mb-2">
        <div className="text-gray-900 dark:text-white font-bold text-2xl">
          {content.title}
        </div>
        <div>
          <QualitySelector />
          <br />
          {metadata.slides ? (
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <a href={metadata.slides} target="_blank">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2">
                  Slides
                </button>
              </a>
            </div>
          ) : null}
        </div>
      </div>
      <br />
      <br /> <br />
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
      <br /> <br />
      <br /> <br />
    </div>
  );
};
