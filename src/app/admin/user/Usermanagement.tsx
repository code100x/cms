'use client';
import { logoutUser, searchPayoutMethods } from '@/actions/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useState } from 'react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Copy, LogOut, Search } from 'lucide-react';

const UserManagement = () => {
  interface SearchResult {
    upiIds: { value: string }[];  
    solAddresses: { value: string }[]; 
  }

  const formRef = React.useRef<HTMLFormElement>(null);

  const [loading, setloading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult>();

  const handlLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const adminPassword = formData.get('adminPassword') as string;
    const res = await logoutUser(email, adminPassword);
    toast.info(res.message || res.error);
  };

  const handlePayoutMethodSearch = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm = formData.get('search-term') as string;
    const adminPassword = formData.get('adminPassword') as string;

    setloading(true);
    const res = await searchPayoutMethods(searchTerm, adminPassword);
    setloading(false);

    setSearchResults(res.data);
    if (res.error) {
      toast.error(res.error);
    }
  };

  const handleCopyToClipboard = (e: any, value: string) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast.success('Copied to clipboard');
      })
      .catch((e) => {
        toast.error('Failed to copy');
      });
  };

  return (
    <div className="h-full w-full">
      <Accordion
        defaultValue="search-payout-methods"
        className="rounded-2xl border-2 p-4"
        type="single"
        collapsible
      >
        <AccordionItem className="p-6" value="search-payout-methods">
          <AccordionTrigger className="p-6 text-lg font-bold lg:text-2xl">
            <div className="flex flex-col gap-4 text-nowrap">
              <Search size={40} /> Search Payout Methods
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <form
              className="h-full w-full"
              onSubmit={handlePayoutMethodSearch}
              ref={formRef}
            >
              <div className="grid w-full grid-cols-1 rounded-lg dark:border-gray-800 md:grid-cols-7">
                <div className="col-span-1 grid gap-2 p-6 lg:col-span-3">
                  <div className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    Enter user&apos;s github / email to get payout methods
                  </div>
                </div>

                <aside className="col-span-1 flex w-full flex-col gap-6 lg:col-span-4">
                  <div className="">
                    <Label className="sr-only">EMAIL / GITHUB</Label>
                    <Input
                      className="h-14 w-full px-2"
                      id="search-term"
                      name="search-term"
                      placeholder="github username / example@gmail.com"
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
                  <Button className="w-full lg:w-[20%]">
                    {loading ? 'Searching..' : 'Search'}
                  </Button>
                </aside>
              </div>
              {searchResults && (
                <div className="flex w-full flex-col items-start justify-between pt-10 md:flex-row md:px-6">
                  <div className="w-full">
                    <p className="text-lg font-semibold">UPI IDs</p>
                    <ul>
                      {searchResults.upiIds.length === 0 ? (
                        <li className="text-[#9BA3AF]">
                          No associated upi ids
                        </li>
                      ) : (
                        searchResults.upiIds.map((upi: any, id: number) => (
                          <li
                            className="my-2 flex h-fit items-center justify-between rounded-lg border p-3 md:w-5/6"
                            key={id}
                          >
                            {upi.value}
                            <Button
                              size={'iconSM'}
                              onClick={(e) =>
                                handleCopyToClipboard(e, upi.value)
                              }
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="w-full">
                    <p className="text-lg font-semibold">Solana Addresses</p>
                    <ul>
                      {searchResults.solAddresses.length === 0 ? (
                        <li className="text-[#9BA3AF]">
                          No associated solana addresses
                        </li>
                      ) : (
                        searchResults.solAddresses.map(
                          (sol: any, id: number) => (
                            <li
                              className="my-2 flex h-fit items-center justify-between text-ellipsis rounded-lg border p-3 md:w-5/6"
                              key={id}
                            >
                              <span className="block md:hidden">
                                {sol.value.slice(0, 20)}...
                              </span>
                              <span className="hidden md:block">
                                {sol.value}
                              </span>
                              <Button
                                size={'iconSM'}
                                onClick={(e) =>
                                  handleCopyToClipboard(e, sol.value)
                                }
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </li>
                          ),
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-none p-6" value="logout-user">
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
              <div className="grid w-full grid-cols-1 rounded-lg dark:border-gray-800 md:grid-cols-7">
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

export default UserManagement;
