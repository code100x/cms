'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';
import { Bookmark } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

export const FolderView = ({
  courseContent,
  courseId,
  rest,
}: {
  courseId: number;
  rest: string[];
  courseContent: {
    type: 'folder' | 'video' | 'notion';
    title: string;
    image: string;
    id: number;
    markAsCompleted: boolean;
    percentComplete: number | null;
    videoFullDuration?: number;
    duration?: number;
    bookmark: Bookmark | null;
  }[];
}) => {
  const router = useRouter();

  if (!courseContent?.length) {
    return (
      <div className="flex mt-64">
        <div className="m-auto">No content here yet!</div>
      </div>
    );
  }
  let updatedRoute = `/courses/${courseId}`;
  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }
  // why? because we have to reset the segments or they will be visible always after a video

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortby(e.target.value);
  };

  const [recentVideo, setRecentvideo] = useState(1);
  useEffect(() => {
    async function getHistory() {
      const session = await getSession();
      if (!session?.user) {
        return [];
      }

      const userId = session.user.id;
      const res = await fetch(
        `/api/user/history?id=${userId}&courseId=${courseId}`,
      );
      const userHistory = await res.json();
      setRecentvideo(userHistory.id);
    }
    getHistory();
  }, []);

  const [sortby, setSortby] = useState('same');
  const [sortedContent, setSortedContent] = useState(courseContent);
  useEffect(() => {
    let sorted = [...courseContent];
    if (sortby === 'reverse') {
      sorted = sorted.slice().reverse();
    }
    if (sortby === 'recent') {
      const start = [];
      let i = 0;
      while (i < sorted.length && recentVideo !== sorted[i].id) {
        start.push(sorted[i]);
        i++;
      }
      sorted = sorted.slice(i).concat(start);
    }
    setSortedContent(sorted);
  }, [sortby]);

  return (
    <div>
      <div></div>

      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
        <select
          value={sortby}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="reverse">Newest First</option>
          <option value="same">Oldest First</option>
          <option value="recent">Recently Watched</option>
        </select>
      </div>

      <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
        {sortedContent.map((content) => {
          const videoProgressPercent =
            content.type === 'video' &&
            content.videoFullDuration &&
            content.duration
              ? (content.duration / content.videoFullDuration) * 100
              : 0;
          return (
            <ContentCard
              type={content.type}
              contentId={content.id}
              key={content.id}
              title={content.title}
              image={content.image || ''}
              onClick={() => {
                router.push(`${updatedRoute}/${content.id}`);
              }}
              markAsCompleted={content.markAsCompleted}
              percentComplete={content.percentComplete}
              videoProgressPercent={videoProgressPercent}
              bookmark={content.bookmark}
              contentDuration={content.videoFullDuration}
            />
          );
        })}
      </div>
    </div>
  );
};
