'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { EyeIcon, EyeOff, PackagePlus } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';
import { courseSchema, CourseType } from '@/lib/validation/courseSchema';

export default function CourseCreate() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<CourseType>({
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

  const onSubmit = async (data: CourseType) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/admin/course', data);
      if (res.status === 200) {
        router.push(`/admin/course/${res?.data?.data?.id}`);
      }
      toast.success('Course succesfully created');
    } catch (error: any) {
      console.log(error);
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper my-2 flex flex-col gap-4">
      <Accordion
        defaultValue="add-new-course"
        className="rounded-2xl border-2 p-4"
        type="single"
        collapsible
      >
        <AccordionItem value="add-new-course">
          <AccordionTrigger className="p-6 text-2xl font-bold">
            <div className="flex flex-col gap-4">
              <PackagePlus size={40} />
              New course
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-1 lg:grid-cols-7">
              <div className="col-span-1 p-6 text-sm font-semibold text-gray-400 lg:col-span-2">
                Create new course for 100xdevs community and let user explore
                new courses
              </div>
              <div className="col-span-1 p-4 lg:col-span-5">
                <Card className="border-2 bg-background">
                  <CardHeader>
                    {/* <CardTitle>Create a new course</CardTitle> */}
                    <CardTitle>Fill in the course details below</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 p-4 pt-0">
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
                                  className="h-12 px-3"
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
                              <FormLabel>Image url</FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 px-3"
                                  placeholder="Enter the url of Image"
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
                                  className="h-12 px-3"
                                  placeholder="Enter the Description of course"
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
                                  className="h-12 px-3"
                                  placeholder="Enter the Course slug"
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
                              <FormLabel>Id</FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 px-3"
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
                          name="appxCourseId"
                          render={({ field }: { field: any }) => (
                            <FormItem>
                              <FormLabel>app x course id</FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 px-3"
                                  placeholder="Enter the appx course ID"
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
                              <FormLabel>Discord Role Id</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter the Discord Role Id"
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
                            <FormItem className="col-span-1 lg:col-span-2">
                              <FormLabel>Admin Secret</FormLabel>
                              <FormControl>
                                <div className="flex w-full rounded-lg border">
                                  <Input
                                    className="h-12 px-3"
                                    type={
                                      isPasswordVisible ? 'text' : 'password'
                                    }
                                    placeholder="••••••••"
                                    {...field}
                                  />
                                  <button
                                    onClick={() =>
                                      setIsPasswordVisible((p) => !p)
                                    }
                                    type="button"
                                    className="ml-2 mr-2 text-gray-600"
                                  >
                                    {isPasswordVisible ? (
                                      <EyeIcon />
                                    ) : (
                                      <EyeOff />
                                    )}
                                  </button>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="lg:col-span-2">
                          {isLoading ? (
                            <Button>Loading...</Button>
                          ) : (
                            <Button className="w-[20%]" type="submit">
                              Create
                            </Button>
                          )}
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className="border-none" value="discord-config">
          <AccordionTrigger className="p-6 text-2xl font-bold">
            <div className="flex flex-col gap-4">
              <FaDiscord className="text-5xl" /> Discord Config
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-1 lg:grid-cols-7">
              <div className="text-gray-400col-span-1 p-6 text-sm font-semibold lg:col-span-2">
                Mangae discord configuration for the users
              </div>
              <div className="col-span-1 p-4 lg:col-span-5">
                <Card className="bg-background">
                  <CardHeader>
                    <CardTitle>Discord</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5 lg:flex-row">
                    <Card className="mx-auto w-full max-w-3xl overflow-y-auto border-2 bg-background">
                      <CardHeader>
                        <CardTitle>
                          Allow user another account in cohort 3
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4 p-4 pt-0">
                        <Input
                          type="text"
                          placeholder="Email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        ></Input>
                        <Input
                          type="text"
                          placeholder="Admin Password"
                          onChange={(e) => {
                            setAdminPassword(e.target.value);
                          }}
                        ></Input>
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
                    <Card className="mx-auto w-full max-w-3xl overflow-y-auto border-2 bg-background">
                      <CardHeader>
                        <CardTitle>
                          Get users discord username in cohort 3
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid gap-4 p-4 pt-0">
                        <Input
                          type="text"
                          placeholder="Email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        ></Input>
                        <Input
                          type="text"
                          placeholder="Admin Password"
                          onChange={(e) => {
                            setAdminPassword(e.target.value);
                          }}
                        ></Input>
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
