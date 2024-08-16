// import { CheckCircle2 } from 'lucide-react';
// import PercentageComplete from './PercentageComplete';
// import { Bookmark } from '@prisma/client';
// import BookmarkButton from './bookmark/BookmarkButton';
// import { formatTime } from '@/lib/utils';
// import VideoThumbnail from './videothumbnail';
// import CardComponent from './CardComponent';

// export const ContentCard = ({
//   title,
//   onClick,
//   markAsCompleted,
//   percentComplete,
//   type,
//   videoProgressPercent,
//   hoverExpand = true,
//   bookmark,
//   contentId,
//   contentDuration,
// }: {
//   type: 'folder' | 'video' | 'notion';
//   contentId?: number;
//   image: string;
//   title: string;
//   onClick: () => void;
//   markAsCompleted?: boolean;
//   percentComplete?: number | null;
//   videoProgressPercent?: number;
//   hoverExpand?: boolean;
//   bookmark?: Bookmark | null;
//   contentDuration?: number;
// }) => {
//   // let image ;
//   // image = ""

//   return (
//     <div
//       onClick={onClick}
//       className={`relative cursor-pointer duration-200 ease-in group${hoverExpand ? ' ' : ''} `}
//     >
//       {percentComplete !== null && percentComplete !== undefined && (
//         <PercentageComplete percent={percentComplete} />
//       )}
//       {markAsCompleted && (
//         <div className="absolute right-2 top-2 z-10">
//           <CheckCircle2 color="green" size={30} fill="lightgreen" />
//         </div>
//       )}
//       {type === 'video' && (
//         <div className="text-blue-900g absolute bottom-12 right-2 z-10 rounded-md bg-zinc-900 p-1 px-2 font-semibold text-white">
//           {contentDuration && formatTime(contentDuration)}
//         </div>
//       )}
//       {type !== 'video' && (
//         <div className="relative overflow-hidden rounded-md">
//           <CardComponent title={title} type={type} />
//           {/* <img src={image} alt={title} className="" /> */}
//           {!!videoProgressPercent && (
//             <div className="absolute bottom-0 h-1 w-full bg-[#707071]">
//               <div
//                 className="h-full bg-[#FF0101]"
//                 style={{ width: `${videoProgressPercent}%` }}
//               />
//             </div>
//           )}
//         </div>
//       )}
//       {type === 'video' && (
//         <div className="relative overflow-hidden rounded-md">
//           <VideoThumbnail
//             title={title}
//             contentId={contentId ?? 0}
//             imageUrl=""
//             // imageUrl={
//             //   'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/video.png'
//             // }
//           />
//         </div>
//       )}

//       {bookmark !== undefined && contentId && (
//         <div className="absolute left-2 top-2">
//           <BookmarkButton
//             bookmark={bookmark}
//             contentId={contentId}
//             size={28}
//             align="start"
//             side="bottom"
//           />
//         </div>
//       )}
//       <div className="mt-2 flex justify-between text-gray-900 dark:text-white">
//         <div>{title} </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const ContentCard = ({
  title,
  onClick,
  percentComplete,
  contentDuration,
  postedDate,
}: {
  title: string;
  onClick: () => void;
  percentComplete?: number;
  contentDuration?: string;
  postedDate?: string;
}) => {
  const [courseName, videoTitle] = title.split(' | ');
  console.log(courseName);
  const tag = '100xdevs';

  return (
    <div
      onClick={onClick}
      className="w-full max-w-[350px] cursor-pointer overflow-hidden rounded-lg border border-border bg-[#121212] shadow-lg"
    >
      <div className="relative grid h-[160px] place-items-center bg-[#0052CC] p-4">
        <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-white/20"></div>
        <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-white/20"></div>
        <div>
          <div className="mx-auto mb-1 w-fit rounded-xl bg-blue-500 px-3 py-0.5 text-center text-sm font-medium text-white/80">
            {tag}
          </div>
          <h2 className="mt-4 text-center text-xl font-semibold capitalize text-white">
            {videoTitle || title}
          </h2>
        </div>
        {contentDuration ? (
          <div className="absolute bottom-2 right-2 w-fit rounded-full bg-[#4C9AFF] px-2 py-0.5 text-right text-xs font-medium text-white">
            {contentDuration}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="flex items-center justify-between overflow-hidden bg-background p-4">
        <div>
          <h3 className="text-lg font-semibold capitalize text-white">
            {videoTitle || title}
          </h3>
          {postedDate && (
            <p className="text-sm text-[#A0A0A0]">Posted on: {postedDate}</p>
          )}
        </div>
        {percentComplete !== undefined && (
          <div className="h-12 w-12">
            <CircularProgressbar
              value={percentComplete}
              text={`${percentComplete}%`}
              styles={buildStyles({
                textSize: '28px',
                pathColor: '#36B37E',
                textColor: '#36B37E',
                trailColor: '#1E1E1E',
              })}
            />
          </div>
        )}
      </div>
    </div>
  );
};
