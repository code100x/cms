import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import VideoPreview from '@/actions/videopreview/videoPreview';
import { useEffect } from 'react';

const VideoThumbnail = ({
  imageUrl,
  contentId,
}: {
  imageUrl: string;
  contentId: number | undefined;
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    async function fetchVideoUrl() {
      const videoUrl = await VideoPreview({ contentId });
      if (videoUrl) {
        setVideoUrl(videoUrl);
      }
    }
    fetchVideoUrl();
  }, [contentId]);
  console.log(videoUrl);
  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      className="m max-h-[573px] max-w-[1053px]  relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className=" w-full h-full relative">
        {hover && videoUrl ? (
          <div className="w-full h-full">
            <ReactPlayer
              url={videoUrl}
              playing
              loop
              controls
              muted
              width="100%"
              height="100%"
            />
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="Video Thumbnail"
            className=" w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default VideoThumbnail;
