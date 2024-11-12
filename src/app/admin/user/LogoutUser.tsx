'use client';
import { logoutUser } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LogOut } from 'lucide-react';

const LogoutUserComp = () => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handlLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get('email') as string;
    const adminPassword = formData.get('adminPassword') as string;
    const res = await logoutUser(email, adminPassword);
    toast.info(res.message || res.error);
  };
  return (
    <div className="h-full w-full">
      <Accordion
        defaultValue="approve-comment"
        className="rounded-2xl border-2 p-4"
        type="single"
        collapsible
      >
        <AccordionItem className="border-none" value="approve-comment">
          <AccordionTrigger className="p-6 text-lg font-bold lg:text-2xl">
            <div className="flex flex-col gap-4">
              <LogOut size={40} /> Logout User
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <form
              className="h-full w-full"
              onSubmit={handlLogout}
              ref={formRef}
            >
              <div className="grid w-full grid-cols-1 rounded-lg shadow-sm dark:border-gray-800 md:grid-cols-7">
                <div className="col-span-1 grid gap-2 p-6 lg:col-span-3">
                  <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    Enter the information below to logout the user
                  </div>
                </div>

                <aside className="col-span-1 flex w-full flex-col gap-6 lg:col-span-4">
                  <div className="">
                    <Label className="sr-only">EMAIL</Label>
                    <Input
                      className="h-14 w-full px-2"
                      id="email"
                      name="email"
                      placeholder="example@gmail.com"
                      style={{
                        minWidth: '0',
                      }}
                    />
                  </div>
                  <div className="">
                    <Label className="sr-only">Admin password</Label>
                    <Input
                      className="h-14 w-full px-2"
                      id="adminPassword"
                      name="adminPassword"
                      placeholder="Admin password"
                      style={{
                        minWidth: '0',
                      }}
                    />
                  </div>
                  <Button className="w-full lg:w-[20%]">Logout</Button>
                </aside>
              </div>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default LogoutUserComp;
