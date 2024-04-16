import React from 'react';

interface Props {
  videoURL: string;
  width: string;
  height: string;
  style?: React.CSSProperties;
}

export const YoutubeRenderer = ({ width, height, videoURL, style }: Props) => {
  if (!videoURL) {
    return null;
  }
  return (
    <iframe
      width={width}
      height={height}
      src={videoURL}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      style={style}
    ></iframe>
  );
};

// Example Usage:
/* <YoutubeRenderer
  width="1280"
  height="720"
  videoURL={'https://www.youtube.com/embed/IJkYipYNEtI?si=lJKtCZFohqFn1l5z'}
/>; */

export default YoutubeRenderer;
