'use client';

import Hls from '@mehul-srivastava/hls.js/dist/hls.js';
import React, { useEffect, useRef } from 'react';

const VideoPlayer3 = ({ options }: { options: any }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const vidUrl = options.sources[0].src;

  useEffect(() => {
    const hls = new Hls();

    if (Hls.isSupported() && videoRef.current) {
      // @ts-ignore
      hls.log = false;
      hls.loadSource(vidUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.ERROR, (err) => {
        console.log(err);
      });
    } else {
      console.log('load');
    }
  }, [options]);

  return <video ref={videoRef} controls src={vidUrl} />;
};

export default VideoPlayer3;
