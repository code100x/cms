'use client';
import { useState } from 'react';
import axios from 'axios';

export const UpdateVideoClient = ({
  content,
}: {
  content: {
    type: 'video';
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    markAsCompleted: boolean;
  };
}) => {
  const [link1080, setLink1080] = useState('');
  const [link720, setLink720] = useState('');
  const [link360, setLink360] = useState('');

  const [link1080_mp4, setLink1080_mp4] = useState('');
  const [link720_mp4, setLink720_mp4] = useState('');
  const [link360_mp4, setLink360_mp4] = useState('');

  const [pdfLink, setPdfLink] = useState('');
  const [vttLink, setVttLink] = useState('');

  return (
    <>
      m3u8 links
      <input
        value={link1080}
        type="text"
        onChange={(e) => {
          setLink1080(e.target.value);
          setLink720(e.target.value.replace('1080', '720'));
          setLink360(e.target.value.replace('1080', '360'));
        }}
        placeholder={'m3u8 1080p'}
      />
      <input
        value={link720}
        type="text"
        onChange={(e) => {
          setLink720(e.target.value);
        }}
        placeholder={'m3u8 720p'}
      />
      <input
        value={link360}
        type="text"
        onChange={(e) => {
          setLink360(e.target.value);
        }}
        placeholder={'m3u8 360p'}
      />
      <br />
      Mp4 links
      <input
        value={link1080_mp4}
        type="text"
        onChange={(e) => {
          setLink1080_mp4(e.target.value);
          setLink720_mp4(e.target.value.replace('1080', '720'));
          setLink360_mp4(e.target.value.replace('1080', '360'));
        }}
        placeholder={'m3u8 1080p'}
      />
      <input
        value={link720_mp4}
        type="text"
        onChange={(e) => {
          setLink720_mp4(e.target.value);
        }}
        placeholder={'m3u8 720p'}
      />
      <input
        value={link360_mp4}
        type="text"
        onChange={(e) => {
          setLink360_mp4(e.target.value);
        }}
        placeholder={'m3u8 360p'}
      />
      <button
        className="my-4 rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700"
        onClick={async () => {
          await axios.post('/api/admin/updatecontent', {
            contentId: content.id,
            updates: {
              video_360p: link360,
              video_720p: link720,
              video_1080p: link1080,
              video_360p_mp4: link360_mp4,
              video_720p_mp4: link720_mp4,
              video_1080p_mp4: link1080_mp4,
            },
          });
        }}
      >
        Update
      </button>
      <input
        value={pdfLink}
        type="text"
        onChange={(e) => {
          setPdfLink(e.target.value);
        }}
        placeholder={'pdf link'}
      />
      <button
        className="my-4 rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700"
        onClick={async () => {
          await axios.post('/api/admin/contentmetadata', {
            contentId: content.id,
            updates: {
              slides: pdfLink,
            },
          });
        }}
      >
        Update slide link
      </button>
      <br />
      <input
        value={vttLink}
        type="text"
        onChange={(e) => {
          setVttLink(e.target.value);
        }}
        placeholder={'vtt link'}
      />
      <button
        className="my-4 rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700"
        onClick={async () => {
          await axios.post('/api/admin/contentmetadata', {
            contentId: content.id,
            updates: {
              subtitles: vttLink,
            },
          });
        }}
      >
        Update vtt link
      </button>
    </>
  );
};
