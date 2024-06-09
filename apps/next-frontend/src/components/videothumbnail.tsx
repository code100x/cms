import React, { useState } from 'react';
import VideoPreview from '@/actions/videopreview/videoPreview';
import { useEffect } from 'react';

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
      className="m relative max-h-[573px] max-w-[1053px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full w-full">
        {hover && videoUrl ? (
          <div className="h-full w-full">
            <video muted autoPlay width="100%" height="100%">
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="Video Thumbnail"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default VideoThumbnail;
