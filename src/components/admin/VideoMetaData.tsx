'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { isValidJsonString } from '@/utiles/is-valid-json';
import React, { useState } from 'react';
import { toast } from 'sonner';

const VideoMetaData = () => {
  const [segmentsJson, setSegmentsJson] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [contentId, setContentId] = useState('');

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-6">
      <div className="text-3xl font-bold">Add Video MetaData</div>
      <Textarea
        rows={10}
        placeholder="segments json"
        className="w-full text-black dark:text-white"
        onChange={(e) => {
          setSegmentsJson(e.target.value);
        }}
      />
      <Input
        placeholder="admin secret"
        className="text-black"
        type=" text"
        onChange={(e) => {
          setAdminSecret(e.target.value);
        }}
      />
      <Input
        placeholder="content id"
        className="text-black"
        type=" text"
        onChange={(e) => {
          setContentId(e.target.value);
        }}
      />

      <h1>JSON is validated in the form.</h1>
      <Button
        className="rounded bg-blue-500 px-4 font-bold text-white hover:bg-blue-700"
        onClick={async () => {
          if (!isValidJsonString(segmentsJson)) {
            return toast.warning('Not a valid JSON');
          }

          await fetch('/api/admin/segments', {
            body: JSON.stringify({
              adminSecret,
              contentId,
              segmentsJson,
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }}
      >
        Add segments
      </Button>
    </div>
  );
};

export default VideoMetaData;
