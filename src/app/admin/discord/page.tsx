'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DiscordPage() {
  const [email, setEmail] = useState('');
  const [adminSecret, setAdminSecret] = useState('' as any);
  const [userData, setUserData] = useState({} as any);
  return (
    <div className="flex flex-col justify-around px-10 py-5 md:flex-row">
      <div className="flex flex-col justify-self-center rounded-lg border p-5">
        <h1 className="text-xl sm:text-2xl md:text-4xl">
          Refresh discord permissions
        </h1>
        <br />
        <Input
          placeholder="email"
          className="text-black"
          type=" text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <Input
          className="text-black"
          type="text"
          placeholder="adminSecret"
          onChange={(e) => setAdminSecret(e.target.value)}
        />
        <br />
        <Button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={async () => {
            const response = await fetch('/api/admin/discord/refresh', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                adminSecret,
              }),
            });
            const json = await response.json();
            if (response.status !== 200) {
              toast.warning(`Something went wrong ${json.msg}`);
            }
          }}
        >
          Allow user to re-initiate discord
        </Button>
        <br />
        <h1 className="text-center capitalize">
          please delete old user from discord first
        </h1>
      </div>

      <br />
      <div className="flex flex-col gap-2 rounded-lg border p-5">
        <h1 className="text-xl sm:text-2xl md:text-4xl">Get information</h1>
        <Input
          placeholder="email"
          className="text-black"
          type=" text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          className="text-black"
          type="text"
          placeholder="adminSecret"
          onChange={(e) => setAdminSecret(e.target.value)}
        />
        <Button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={async () => {
            const response = await fetch('/api/admin/discord/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                adminSecret,
              }),
            });
            const json = await response.json();
            if (response.status !== 200) {
              toast.warning(`Something went wrong ${json.msg}`);
            }
            setUserData(json.data);
          }}
        >
          Get information
        </Button>

        <h1 className="text-xl">{userData?.username}</h1>
      </div>
    </div>
  );
}
