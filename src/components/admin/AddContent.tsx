'use client';
import React, { useEffect, useState } from 'react';
import { AddNotionMetadata } from './AddNotionMetadata';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export const AddContent = ({
  courseId,
  parentContentId,
}: {
  courseId: number;
  parentContentId?: number;
}) => {
  const [type, setType] = useState('folder');
  const [metadata, setMetadata] = useState({});

  return (
    <div className="h-full w-full rounded-md pb-8">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex h-full min-h-[224px] w-full flex-col items-center justify-center rounded-md border-2 border-border bg-white bg-opacity-20 align-middle backdrop-blur-md duration-300 hover:bg-opacity-30">
            <span className="text-8xl">+</span>
            <span className="text-2xl">Add New Content</span>
          </div>
        </DialogTrigger>
        <DialogContent>
          <Tabs
            onValueChange={(value) => setType(value)}
            defaultValue="folder"
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="folder">Folder</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="notion">Notion</TabsTrigger>
            </TabsList>
            <TabsContent value="folder">
              <TabInnerContent
                type={type}
                courseId={courseId}
                parentContentId={parentContentId}
                metadata={metadata}
              />
            </TabsContent>
            <TabsContent value="video">
              <TabInnerContent
                type={type}
                courseId={courseId}
                parentContentId={parentContentId}
                metadata={metadata}
              >
                <AddVideosMetadata onChange={setMetadata} />
              </TabInnerContent>
            </TabsContent>
            <TabsContent value="notion">
              <TabInnerContent
                type={type}
                courseId={courseId}
                parentContentId={parentContentId}
                metadata={metadata}
              >
                <AddNotionMetadata onChange={setMetadata} />
              </TabInnerContent>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
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

const TabInnerContent = ({
  children,
  type,
  courseId,
  parentContentId,
  metadata,
}: {
  children?: React.ReactNode;
  type: string;
  courseId: number;
  parentContentId?: number;
  metadata: any;
}) => {
  const [title, setTitle] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/content', {
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
    if (res.status === 200) {
      toast.success('Content added successfully');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    } else if (res.status === 403) {
      toast.error('Incorrect admin password');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-2">
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
      {children}
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="my-2 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 dark:text-white"
      >
        Submit
      </Button>
    </>
  );
};
