import React, { useState } from 'react';
import VideoPreview from '@/actions/videopreview/videoPreview';
import { useEffect } from 'react';
import { LazyLoadImage } from './LazyLoadImage';

const VideoThumbnail = ({
  imageUrl,
  contentId,
}: {
  imageUrl: string;
  contentId: number;
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    async function fetchVideoUrl() {
      const url = await VideoPreview({ contentId });
      setVideoUrl(url);
    }
    fetchVideoUrl();
  }, [contentId]);
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
            <video muted autoPlay width="100%" height="100%">
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        ) : (
          <LazyLoadImage
            src={imageUrl}
            alt="Video Thumbnail"
            width={500}
            height={250}
            className=" w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default VideoThumbnail;
