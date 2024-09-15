'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FolderPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FaDiscord } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const courseSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters long.',
  }),
  imageUrl: z.string().url({
    message: 'Invalid URL format for imageUrl.',
  }),
  description: z.string().min(8, {
    message: 'Description must be at least of 8 characters long.',
  }),
  slug: z.string(),
  id: z.string(),
  adminSecret: z.string(),
  appxCourseId: z.string(),
  discordRoleId: z.string(),
});

export default function Courses() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
      description: '',
      slug: '',
      id: '',
      adminSecret: '',
      appxCourseId: '',
      discordRoleId: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof courseSchema>) => {
    setIsLoading(true);
    try {
      await axios.post('/api/admin/course', data);
      toast('Course successfully created');
      router.push('/');
    } catch (error: any) {
      console.log(error);
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <FolderPlus className="size-8" />
        <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
          Add New Course
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 lg:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4"
                    placeholder="Enter the Course name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4"
                    placeholder="Enter the URL of Image"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }: { field: any }) => (
              <FormItem className="col-span-1 lg:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-[100px] px-4 py-2"
                    placeholder="Enter the Course Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4"
                    placeholder="Enter the Course Slug"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="id"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4"
                    placeholder="Enter the Course ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adminSecret"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Admin Secret</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4"
                    placeholder="Enter the Admin Secret"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appxCourseId"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>App X Course ID</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4"
                    placeholder="Enter the App X Course ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discordRoleId"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Discord Role ID</FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4"
                    placeholder="Enter the Discord Role ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-1 lg:col-span-2">
            <Button
              className="w-full lg:w-auto"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Course'}
            </Button>
          </div>
        </form>
      </Form>

      <Separator />
      <Accordion type="single" collapsible>
        <AccordionItem value="discord-config">
          <AccordionTrigger className="p-6 text-2xl font-bold">
            <div className="flex flex-col gap-4">
              <FaDiscord className="text-5xl" /> Discord Config
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-1 lg:grid-cols-7">
              <div className="text-gray-400col-span-1 p-6 text-sm font-semibold lg:col-span-2">
                Manage discord configuration for the users
              </div>
              <div className="col-span-1 p-4 lg:col-span-5">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>Discord</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5 lg:flex-row">
                    <Card className="mx-auto w-full max-w-3xl overflow-y-auto border bg-background">
                      <CardHeader>
                        <CardTitle>
                          Allow user another account in cohort 3
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4 p-4 pt-0">
                        <Input
                          type="text"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                          type="text"
                          placeholder="Admin Password"
                          onChange={(e) => setAdminPassword(e.target.value)}
                        />
                        <Button
                          onClick={async () => {
                            try {
                              const res = await axios.post(
                                '/api/admin/discordReset',
                                {
                                  email,
                                  adminPassword,
                                },
                              );
                              toast(JSON.stringify(res.data.data));
                            } catch (error) {
                              //@ts-ignore
                              toast.error(error.response.data.message);
                            }
                          }}
                        >
                          Reset
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="mx-auto w-full max-w-3xl overflow-y-auto border bg-background">
                      <CardHeader>
                        <CardTitle>
                          Get users discord username in cohort 3
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4 p-4 pt-0">
                        <Input
                          type="text"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                          type="text"
                          placeholder="Admin Password"
                          onChange={(e) => setAdminPassword(e.target.value)}
                        />
                        <Button
                          onClick={async () => {
                            try {
                              const res = await axios.post(
                                '/api/admin/discordReset/get',
                                {
                                  email,
                                  adminPassword,
                                },
                              );
                              alert(JSON.stringify(res.data));
                            } catch (error: any) {
                              toast.error(error.response.data.message);
                            }
                          }}
                        >
                          Get
                        </Button>
                      </CardContent>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
