'use client';
import { Button } from '@repo/ui/shad/button';
import { Input } from '@repo/ui/shad/input';
import { Textarea } from '@repo/ui/shad/textarea';
import { isValidJsonString } from '@/utiles/is-valid-json';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DiscordPage() {
  const [email, setEmail] = useState('');
  const [segmentsJson, setSegmentsJson] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [contentId, setContentId] = useState('');
  return (
    <div className="flex flex-col justify-between gap-2 p-2 sm:p-10 lg:flex-row">
      <form className="flex w-full flex-col items-center gap-5 rounded-xl border p-5">
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
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
      <div className="flex flex-col items-center gap-5 rounded-lg border px-2">
        <br />
        <h2 className="text-center text-xl sm:text-2xl md:text-4xl">
          Add video metadata
        </h2>

        <Textarea
          // style={{ width: 800 }}
          rows={10}
          placeholder="segments json"
          className="w-[80vw] text-black lg:w-[800px] dark:text-white"
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
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
        <br />
      </div>
    </div>
  );
}
