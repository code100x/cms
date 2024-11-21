"use client";
import { GetAppxVideoPlayerUrl } from "@/actions/user";
import { useEffect, useState } from "react";

export const AppxVideoPlayer = ({
  courseId,
  videoId,
}: {
  courseId: string;
  videoId: string;
}) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const videoUrl = await GetAppxVideoPlayerUrl(courseId, videoId)
        setUrl(videoUrl)
      } catch {
        if (window === undefined) return;
        location.href = '/api/auth/signin';
      }
    })();
  }, [])

  if (!url.length) {
    return <p>Loading...</p>;
  }

  return (
    <iframe
      src={url}
      className="w-[80vw] h-[80vh] rounded-lg"
    ></iframe>
  );
}
