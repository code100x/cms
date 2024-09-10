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
} from "@/components/ui/accordion";
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

    <div className='w-full h-full'>
      <Accordion defaultValue='approve-comment' className='border-2 p-4 rounded-2xl' type="single" collapsible>
        <AccordionItem className='border-none' value="approve-comment">
          <AccordionTrigger className='p-6 text-lg lg:text-2xl font-bold'>
            <div className='flex gap-4 flex-col' >
              <LogOut size={40} /> Logout User
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <form className='w-full h-full' onSubmit={handlLogout} ref={formRef}>
              <div className="grid w-full grid-cols-1 md:grid-cols-7 rounded-lg  shadow-sm dark:border-gray-800">
                <div className="col-span-1 lg:col-span-3 grid gap-2 p-6">
                  <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    Enter the information below to logout the user
                  </div>
                </div>

                <aside className='col-span-1 flex flex-col gap-6 lg:col-span-4 w-full'>
                  <div className="">
                    <Label className="sr-only">EMAIL</Label>
                    <Input
                      className="w-full h-14 px-2"
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
                      className="w-full h-14 px-2"
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
