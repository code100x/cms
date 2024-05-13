'use client';
import { useEffect, useState } from 'react';
import { AddNotionMetadata } from './AddNotionMetadata';
import { Input } from '../ui/input';
import { useRecoilState } from 'recoil';
import { loader } from '@/store/atoms/loader';
import DiscordService from '@/app/services/DiscordService';
import { Checkbox } from '../ui/checkbox';

export const AddContent = ({
  rest,
  courseId,
  parentContentId,
  courseTitle,
}: {
  rest: string[];
  courseId: number;
  parentContentId?: number;
  courseTitle: string;
}) => {
  const [type, setType] = useState('folder');
  const [imageUri, setImageUri] = useState('');
  const [title, setTitle] = useState('');
  const [metadata, setMetadata] = useState({});
  const [checked, setChecked] = useState<Boolean>(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useRecoilState(loader);

  const { sendUpdateToDiscord } = DiscordService();

  interface DiscordData {
    type: string;
    thumbnail: string;
    title: string;
    courseTitle: string;
    courseId: number;
    currFolderId: number;
    mediaId: number;
  }

  const postOnDiscord = (data: DiscordData) => {
    sendUpdateToDiscord(data);
  };

  const handleContentSubmit = async () => {
    setLoading(true);
    const response = await fetch('/api/admin/content', {
      body: JSON.stringify({
        type,
        description: '',
        thumbnail: imageUri,
        title,
        courseId,
        parentContentId,
        metadata,
        adminPassword,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setLoading(false);

    const respData: { id: number } = await response.json();

    const data = {
      type,
      thumbnail:
        'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/video.png',
      title,
      courseTitle,
      courseId,
      currFolderId: parseInt(rest[0], 10),
      mediaId: respData.id,
    };

    if (checked && response.status === 200) {
      if (type === 'notion' || type === 'video') {
        postOnDiscord(data);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="">
        <div className="space-x-2 p-2">
          <button
            className={`${type === 'video' ? 'bg-green-500' : 'bg-blue-500'} rounded px-4 py-2 font-bold text-white`}
            onClick={() => {
              setType('video');
              setMetadata({});
            }}
          >
            Video
          </button>
          <button
            className={`${type === 'folder' ? 'bg-green-500' : 'bg-blue-500'} rounded px-4 py-2 font-bold text-white`}
            onClick={() => {
              setType('folder');
              setMetadata({});
            }}
          >
            Folder
          </button>
          <button
            className={`${type === 'notion' ? 'bg-green-500' : 'bg-blue-500'} rounded px-4 py-2 font-bold text-white`}
            onClick={() => {
              setType('notion');
              setMetadata({});
            }}
          >
            Notion
          </button>
        </div>
        {(type === 'video' || type === 'notion') && (
          <div className="mt-2 flex items-center gap-2 p-2">
            <Checkbox
              onCheckedChange={() => setChecked((prev) => !prev)}
              defaultChecked
              id="discord"
            />
            <label
              htmlFor="discord"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Send the notification to the discord as well
            </label>
          </div>
        )}
        <br /> <br />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          <Input
            className="text-black dark:text-white"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            className="text-black dark:text-white"
            type="text"
            placeholder="Image url"
            onChange={(e) => setImageUri(e.target.value)}
          />
          <Input
            className="text-black dark:text-white"
            type="text"
            placeholder="Admin password"
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        </div>
        {type === 'video' && <AddVideosMetadata onChange={setMetadata} />}
        {type === 'notion' && <AddNotionMetadata onChange={setMetadata} />}
        <button
          onClick={handleContentSubmit}
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          {loading ? 'Submitting' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

const VARIANTS = 1;
function AddVideosMetadata({
  onChange,
}: {
  onChange: (metadata: any) => void;
}) {
  const [metadataGlobal, setMetadata] = useState({} as any);

  useEffect(() => {
    onChange(metadataGlobal);
  }, [metadataGlobal]);
  return (
    <div>
      {[...Array(VARIANTS)].map((_, i) => (
        <AddVideoMetadata
          onChange={async (metadata) => {
            await setMetadata((m: any) => ({
              ...m,
              [`video_1080p_${i}`]: metadata.video_1080p,
              [`video_720p_${i}`]: metadata.video_720p,
              [`video_360p_${i}`]: metadata.video_360p,
            }));
          }}
        />
      ))}
    </div>
  );
}

function AddVideoMetadata({ onChange }: { onChange: (metadata: any) => void }) {
  const [video_1080p, setVideo_1080p] = useState('');
  const [video_720p, setVideo_720p] = useState('');
  const [video_360p, setVideo_360p] = useState('');

  useEffect(() => {
    onChange({ video_1080p, video_720p, video_360p });
  }, [video_1080p, video_720p, video_360p]);
  return (
    <div className="grid grid-cols-1 gap-2 py-2 sm:grid-cols-2 md:grid-cols-3">
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="1080p"
        onChange={async (e) => {
          await setVideo_1080p(e.target.value);
        }}
      />
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="720p"
        onChange={async (e) => {
          await setVideo_720p(e.target.value);
        }}
      />
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="360p"
        onChange={async (e) => {
          await setVideo_360p(e.target.value);
        }}
      />
    </div>
  );
}
