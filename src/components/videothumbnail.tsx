import React, { useState } from 'react';
import VideoPreview from '@/actions/videopreview/videoPreview';
import { useEffect } from 'react';
import CardComponent from './CardComponent';

const VideoThumbnail = ({
  imageUrl,
  contentId,
  title,
}: {
  imageUrl: string;
  contentId: number;
  title: string;
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
    // setHover(true);
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
          <>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Video Thumbnail"
                className="h-full w-full object-cover"
              />
            ) : (
              <CardComponent type="video" title={title} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoThumbnail;
