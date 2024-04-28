'use client';
import { useEffect, useState } from 'react';
import { AddNotionMetadata } from './AddNotionMetadata';
import { Input } from '../ui/input';
import DiscordService from '@/app/service/DiscordService';
import { useRecoilState } from 'recoil';
import { Checkbox } from '../ui/checkbox';
import { loader } from '@/store/atoms/loader';

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
    const fieldsToCheck = [
      'video_1080p_0',
      'video_720p_0',
      'video_360p_0',
      'notionId',
    ];

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

    const respData: any = await response.json();

    const data = {
      type,
      thumbnail: imageUri,
      title,
      courseTitle,
      courseId,
      currFolderId: parseInt(rest[0], 10),
      mediaId: respData.id,
    };

    if (checked && response.status === 200) {
      if (fieldsToCheck.some((field) => field in metadata)) {
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
        <div className="p-2 space-x-2">
          <button
            className={`${type === 'video' ? 'bg-green-500' : 'bg-blue-500'} text-white font-bold py-2 px-4 rounded`}
            onClick={() => {
              setType('video');
              setMetadata({});
            }}
          >
            Video
          </button>
          <button
            className={`${type === 'folder' ? 'bg-green-500' : 'bg-blue-500'}  text-white font-bold py-2 px-4 rounded`}
            onClick={() => {
              setType('folder');
              setMetadata({});
            }}
          >
            Folder
          </button>
          <button
            className={`${type === 'notion' ? 'bg-green-500' : 'bg-blue-500'}  text-white font-bold py-2 px-4 rounded`}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <Input
            className="dark:text-white text-black"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            className="dark:text-white text-black"
            type="text"
            placeholder="Image url"
            onChange={(e) => setImageUri(e.target.value)}
          />
          <Input
            className="dark:text-white text-black"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 py-2">
      <Input
        className="dark:text-white text-black"
        type="text"
        placeholder="1080p"
        onChange={async (e) => {
          await setVideo_1080p(e.target.value);
        }}
      />
      <Input
        className="dark:text-white text-black"
        type="text"
        placeholder="720p"
        onChange={async (e) => {
          await setVideo_720p(e.target.value);
        }}
      />
      <Input
        className="dark:text-white text-black"
        type="text"
        placeholder="360p"
        onChange={async (e) => {
          await setVideo_360p(e.target.value);
        }}
      />
    </div>
  );
}
