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
import { useTheme } from 'next-themes';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const getIcon = (type: string, theme: string) => {
  const color = theme === 'light' ? 'black' : 'white'; // Set color based on theme

  switch (type) {
    case 'video':
      return (
        <svg
          fill={color}
          height="50px"
          width="50px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-14.4 -14.4 88.80 88.80"
        >
          <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z" />
          <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z" />
        </svg>
      );
    case 'notion':
      return (
        <svg
          viewBox="0 -14 24 50"
          height="50px"
          width="50px"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0h16v20H5V0h2zm14 18V2H7v16h14zM9 4h10v2H9V4zm10 4H9v2h10V8zM9 12h7v2H9v-2zm10 10H3V4H1v20h18v-2z" />
        </svg>
      );
    case 'folder':
      return (
        <svg
          fill={color}
          height="50px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 491.52 491.52"
        >
          <path d="M207.05,102.4l-53.53-51.2H0v389.12h491.52V102.4H207.05z M20.48,419.84V71.68H145.3l53.53,51.2h272.21v296.96H20.48z" />
        </svg>
      );
    default:
      return null;
  }
};

export const ContentCard = ({
  type,
  title,
  onClick,
  percentComplete,
  contentDuration,
  postedDate,
}: {
  type: string;
  title: string;
  onClick: () => void;
  percentComplete?: number;
  contentDuration?: string;
  postedDate?: string;
}) => {
  const { theme } = useTheme();
  const circularProgressStyles =
    theme === 'light'
      ? {
          textSize: '28px',
          pathColor: '#36B37E',
          textColor: '#36B37E',
          trailColor: '#ccc',
        }
      : {
          textSize: '28px',
          pathColor: '#36B37E',
          textColor: '#36B37E',
          trailColor: '#1E1E1E',
        };

  const formattedDuration = formatDuration(contentDuration);

  return (
    <div
      onClick={onClick}
      className="w-full max-w-[25rem] cursor-pointer overflow-hidden rounded-lg border border-border bg-background shadow-lg"
    >
      <div className="relative grid h-[12rem] place-items-center bg-[#0052CC] p-4">
        <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-white/20"></div>
        <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-white/20"></div>

        <div>
          <div className="mx-auto mb-1 w-fit rounded-xl bg-blue-500 px-3 py-0.5 text-center text-sm font-medium text-white/80">
            {'100xdevs'}
          </div>
          <h2 className="mt-4 truncate text-center text-xl font-semibold capitalize text-white">
            {title}
          </h2>
          {type === 'video' && formattedDuration ? (
            <div className="absolute bottom-2 right-2 w-fit rounded-full bg-[#4C9AFF] px-2 py-0.5 text-right text-xs font-medium text-white">
              {formattedDuration || '00:00:00'}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="flex items-center justify-between overflow-hidden bg-background p-4">
        <div>
          <h3 className="text-lg font-semibold capitalize dark:text-white">
            {title}
          </h3>
          {postedDate && (
            <p className="text-xs text-[#A0A0A0]">Posted on: {postedDate}</p>
          )}
        </div>
        {type === 'folder' ? (
          <div className="h-12 w-12">
            <CircularProgressbar
              value={percentComplete || 0}
              text={`${percentComplete || 0}%`}
              styles={buildStyles(circularProgressStyles)}
            />
          </div>
        ) : (
          getIcon(type, theme)
        )}
      </div>
    </div>
  );
};

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60); // Get the whole hours
  const remainingMinutes = minutes % 60; // Get the remainder of the minutes after converting to hours
  const seconds = Math.floor((minutes - Math.floor(minutes)) * 60); // Convert fractional minutes to seconds

  // Pad the numbers to ensure two digits and join with colon
  return [hours, remainingMinutes, seconds]
    .map((unit) => unit.toString().padStart(2, '0'))
    .join(':');
}
