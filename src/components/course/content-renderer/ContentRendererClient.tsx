'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { VideoPlayerSegment } from '@/components/course/content-renderer/VideoPlayerSegment';
import VideoContentChapters from './VideoContentChapters';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import CourseContentList from '../../helper/CourseContentList';
import { FullCourseContent } from '@/db/course';
import Comments from '../comment/Comments';
import { QueryParams } from '@/actions/types';
import { CommentType } from '@/types';

export const ContentRendererClient = ({
  metadata,
  content,
  nextContent,
  courseId,
  fullCourseContent,
  searchParams,
  commentsData,
}: {
  nextContent: {
    id: number;
    type: string;
    title: string;
  } | null;
  metadata: any;
  searchParams: QueryParams;
  fullCourseContent: FullCourseContent[];
  courseId: number;
  content: {
    type: 'video';
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    markAsCompleted: boolean;
    commentsCount: number;
  };
  commentsData: { comments: CommentType[]; parentComment: CommentType | null };
}) => {
  const [showChapters, setShowChapters] = useState(
    metadata?.segments?.length > 0,
  );
  const clientSearchParams = useSearchParams();

  const router = useRouter();

  //@ts-ignore
  const [quality, setQuality] = useState<string>(
    clientSearchParams.get('quality') ?? '1080',
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
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <div className="w-full md:w-3/4">
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
          <div className="flex flex-col gap-4 border-b-[1px] py-4">
            <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
              <h2 className="line-clamp-2 text-wrap text-2xl font-extrabold capitalize tracking-tight text-primary md:text-3xl">
                {content.title}
              </h2>
              {metadata.slides ? (
                <Link href={metadata.slides} target="_blank">
                  <Button className="gap-2">Lecture Slides</Button>
                </Link>
              ) : null}
            </div>
            <div className="md:hidden">
              {showChapters && (
                <VideoContentChapters
                  segments={metadata?.segments}
                  onCancel={toggleShowChapters}
                />
              )}
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
          </div>

          <Comments
            data={commentsData}
            searchParams={searchParams}
            content={{
              commentCount: content.commentsCount,
              courseId,
              id: content.id,
              possiblePath: '',
            }}
          />
        </div>
        <div className="hidden w-full overflow-auto md:block md:w-1/4">
          {showChapters && (
            <VideoContentChapters
              segments={metadata?.segments}
              onCancel={toggleShowChapters}
            />
          )}

          <div className="pt-4">
            <CourseContentList
              courseId={courseId}
              fullCourseContent={fullCourseContent}
            />
          </div>
        </div>
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
  );
};
