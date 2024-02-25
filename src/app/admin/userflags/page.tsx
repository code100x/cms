'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { isValidJsonString } from '@/utiles/is-valid-json';
import { useState } from 'react';

export default function DiscordPage() {
  const [email, setEmail] = useState('');
  const [segmentsJson, setSegmentsJson] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [contentId, setContentId] = useState('');
  return (
    <div className="flex flex-col lg:flex-row justify-between p-2 sm:p-10 gap-2">
      <form className="flex flex-col gap-5 w-full p-5 border rounded-xl items-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl">Toggle DRM</h1>
        <Input
          placeholder="email"
          className="text-black dark:text-white"
          type=" text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="admin secret"
          className="text-black dark:text-white"
          type=" text"
          onChange={(e) => {
            setAdminSecret(e.target.value);
          }}
        />

        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={async () => {
            await fetch('/api/admin/drm', {
              body: JSON.stringify({
                adminSecret,
                email,
                disableDrm: false,
              }),
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }}
        >
          Enable DRM
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={async () => {
            await fetch('/api/admin/drm', {
              body: JSON.stringify({
                adminSecret,
                email,
                disableDrm: true,
              }),
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }}
        >
          Disable DRM
        </Button>
      </form>

      <br />
      <div className="flex flex-col items-center gap-5 border rounded-lg px-2">
        <br />
        <h2 className="text-xl sm:text-2xl md:text-4xl text-center">
          Add video metadata
        </h2>

        <Textarea
          // style={{ width: 800 }}
          rows={10}
          placeholder="segments json"
          className="text-black dark:text-white w-[80vw] lg:w-[800px]"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            if (!isValidJsonString(segmentsJson)) {
              // TODO: Use toast or something better
              return alert('Not a valid JSON');
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
        <br />
      </div>
    </div>
  );
}
