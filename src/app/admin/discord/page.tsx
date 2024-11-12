'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { InfoIcon, RefreshCcw } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

export default function DiscordPage() {
  const [email, setEmail] = useState('');
  const [adminSecret, setAdminSecret] = useState('' as any);
  const [userData, setUserData] = useState({} as any);
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col justify-around gap-6 px-4 py-5">
      <section className="my-4 flex items-center gap-2 rounded-lg border-2 bg-primary/5 p-4">
        <FaDiscord className="text-3xl" />
        <h2 className="text-md font-bold">Discord Configuration</h2>
      </section>

      <Accordion
        defaultValue="refresh-permission"
        className="w-full rounded-2xl border-2"
        type="single"
        collapsible
      >
        <AccordionItem className="p-4" value="refresh-permission">
          <AccordionTrigger className="p-6 text-lg font-bold lg:text-2xl">
            <div className="flex flex-col items-start gap-4">
              <RefreshCcw size={40} /> Refresh Discord Permission
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-1 gap-2 rounded-lg border-gray-200 p-2 shadow-sm dark:border-gray-800 lg:grid-cols-7">
              <div className="col-span-1 flex flex-col gap-2 p-4 lg:col-span-3">
                <div className="text-md font-medium leading-none text-gray-500 dark:text-gray-400">
                  User entered discord with wrong email ? Here you can refresh
                  email
                </div>
                <h1 className="capitalize text-yellow-500">
                  (please delete old user from discord first)
                </h1>
              </div>

              <aside className="col-span-1 flex flex-col gap-6 p-4 lg:col-span-4">
                <Input
                  placeholder="Email"
                  className="h-14"
                  type=" text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  className="h-14"
                  type="text"
                  placeholder="adminSecret"
                  onChange={(e) => setAdminSecret(e.target.value)}
                />
                <Button
                  className="w-full rounded px-4 py-2 font-bold text-white lg:w-fit"
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
              </aside>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className="border-none p-4" value="get-user-info">
          <AccordionTrigger className="p-6 text-lg font-bold lg:text-2xl">
            <div className="flex flex-col gap-4">
              <InfoIcon size={40} /> Get User Information
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-1 gap-2 rounded-lg border-gray-200 p-2 shadow-sm dark:border-gray-800 lg:grid-cols-7">
              <div className="col-span-1 flex flex-col gap-2 p-4 lg:col-span-3">
                <div className="text-md font-medium leading-none text-gray-500 dark:text-gray-400">
                  Enter the user email and get user's information just by one
                  click
                </div>
              </div>

              <aside className="col-span-1 flex flex-col gap-6 p-4 lg:col-span-4">
                <Input
                  placeholder="Email"
                  className="h-14 px-2"
                  type=" text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  className="h-14 px-2"
                  type="text"
                  placeholder="Admin secret"
                  onChange={(e) => setAdminSecret(e.target.value)}
                />
                <Button
                  className="w-full rounded px-4 py-2 font-bold text-white lg:w-[20%]"
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
              </aside>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
