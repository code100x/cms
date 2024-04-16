import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

export function AddYoutubeMetaData({
  onChange,
}: {
  onChange: (metadata: any) => void;
}) {
  const [url, setUrl] = useState('');

  const extractVideoId = (url: string) => {
    url = url.trim().replace(/^https:\/\/www\./i, '');
    const pattern = /(?<=v=)[\w-]+/;
    const match = url.match(pattern);

    if (match) {
      return match[0];
    }
  };

  useEffect(() => {
    const videoId = extractVideoId(url);
    console.log(videoId);
    onChange({ id: videoId });
  }, [url]);

  return (
    <div className="py-2">
      <Input
        className="dark:text-white text-black"
        type="text"
        placeholder="Youtube Video Url"
        onChange={async (e) => {
          setUrl(e.target.value);
        }}
      />
    </div>
  );
}
