'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      toast('course succesfully created');
      router.push('/');
    } catch (error: any) {
      console.log(error);
      toast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-6xl overflow-y-auto lg:mt-10">
      <CardHeader>
        <CardTitle>Create a new course</CardTitle>
        <CardDescription>Fill in the course details below</CardDescription>
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
                    <Input placeholder="Enter the Course name" {...field} />
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
                    <Input placeholder="Enter the url of Image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
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
                    <Input placeholder="Enter the Course slug" {...field} />
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
                    <Input placeholder="Enter the Course ID" {...field} />
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
                    <Input placeholder="Enter the Admin Secret" {...field} />
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
                    <Input placeholder="Enter the appx course ID" {...field} />
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
                    <Input placeholder="Enter the Discord Role Id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="lg:col-span-2">
              {isLoading ? (
                <Button>Loading...</Button>
              ) : (
                <Button type="submit">Create</Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
