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
} from "@/components/ui/accordion";
import { InfoIcon, RefreshCcw } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

export default function DiscordPage() {
  const [email, setEmail] = useState('');
  const [adminSecret, setAdminSecret] = useState('' as any);
  const [userData, setUserData] = useState({} as any);
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto justify-around px-4 py-5 gap-6">

      <section className='flex gap-2 border-2 p-4 bg-primary/5 rounded-lg my-4 items-center'>
        <FaDiscord className='text-3xl' />
        <h2 className='text-md font-bold'>Discord Configuration</h2>
      </section>
      
      <Accordion defaultValue='refresh-permission' className='border-2  w-full rounded-2xl' type="single" collapsible>
        <AccordionItem className='p-4' value="refresh-permission">
          <AccordionTrigger className='p-6 text-lg lg:text-2xl font-bold'>
            <div className='flex gap-4 items-start flex-col' >
              <RefreshCcw size={40} /> Refresh Discord Permission
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-1 lg:grid-cols-7 p-2 gap-2 rounded-lg border-gray-200 shadow-sm dark:border-gray-800">
              <div className="col-span-1 lg:col-span-3 flex flex-col gap-2 p-4">
                <div className="text-md font-medium leading-none text-gray-500 dark:text-gray-400">
                  User entered discord with wrong email ? Here you can refresh email
                </div>
                <h1 className="text-yellow-500 capitalize">
                  (please delete old user from discord first)
                </h1>
              </div>

              <aside className='col-span-1 flex flex-col gap-6 p-4 lg:col-span-4 '>

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
                  className="rounded  px-4 py-2 font-bold text-white lg:w-fit w-full"
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

        <AccordionItem className='border-none p-4' value="get-user-info">
          <AccordionTrigger className='p-6 text-lg lg:text-2xl font-bold'>
            <div className='flex gap-4 flex-col' >
              <InfoIcon size={40} /> Get User Information
            </div>
          </AccordionTrigger>
          <AccordionContent>

            <div className="grid w-full grid-cols-1 lg:grid-cols-7 p-2 gap-2 rounded-lg border-gray-200 shadow-sm dark:border-gray-800">
              <div className="col-span-1 lg:col-span-3 flex flex-col gap-2 p-4">
                <div className="text-md font-medium leading-none text-gray-500 dark:text-gray-400">
                  Enter the user email and get user's information just by one click
                </div>
              </div>

              <aside className='col-span-1 flex flex-col gap-6 p-4 lg:col-span-4 '>

                <Input
                  placeholder="Email"
                  className=" h-14 px-2"
                  type=" text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Input
                  className=" h-14 px-2"
                  type="text"
                  placeholder="Admin secret"
                  onChange={(e) => setAdminSecret(e.target.value)}
                />
                <Button
                  className="rounded  px-4 py-2 font-bold text-white  lg:w-[20%] w-full"
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
