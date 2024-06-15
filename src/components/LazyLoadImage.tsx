'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const registerObserver = (
  ref: React.RefObject<Element>,
  setShowImage: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (!ref.current) {
    console.log(' Ref is not attached to a DOM element');
    return;
  }
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      setShowImage(true);
      observer.disconnect();
    });
  });
  observer.observe(ref.current);
};

interface LazyLoadImageProps {
  src: string;
  alt: string;
  className: string;
  width: number;
  height: number;
}
export const LazyLoadImage = ({
  src,
  alt,
  className,
  width,
  height,
}: LazyLoadImageProps) => {
  const [showImage, setshowImage] = useState(false);
  const imgRef = useRef(null);
  useEffect(() => {
    registerObserver(imgRef, setshowImage);
  }, []);
  return showImage ? (
    <Image
      alt={alt}
      src={src}
      className={className}
      width={width}
      height={height}
    />
  ) : (
    <Image
      alt={alt}
      src={src}
      className={className}
      width={width}
      height={height}
      ref={imgRef}
      style={{ filter: 'blur(4px)' }}
    />
  );
};
