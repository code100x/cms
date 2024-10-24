'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOff, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { ContentEditSchema, ContentEditType } from '@/lib/validation/contentSchema';
import UploadContentForm from './UploadContentForm';

interface ContentEditFormProps {
  content: any;
  contentId: any;
  courseId: any;
}
const ContentEditForm = ({
  content,
  contentId,
  courseId,
}: ContentEditFormProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<ContentEditType>({
    resolver: zodResolver(ContentEditSchema),
    defaultValues: {
      title: content?.title ?? '',
      description: content?.description ?? '',
      thumbnail: content?.thumbnail ?? '',
      adminSecret: ''
    },
  });

  const onSubmit: SubmitHandler<ContentEditType> = async (data: any) => {
    try {
      const res = await axios.patch(`/api/admin/content`, {
        title: data.title,
        description: data.description,
        adminSecret: data.adminSecret,
        thumbnail: data.thumbnail,
        contentId: parseInt(contentId, 10),
      });
      if (res?.status === 200) {
        toast.success('Updated Successfully');
      } else if (res?.status === 201) {
        toast.success(res?.data?.message);
      } else if (res?.status === 400) {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      form.setValue('adminSecret', '');
      setIsDisabled(true);
    }
  };
  const videoContent = content?.children
    ?.filter((item: any) => item.type === 'video')
    .sort((a: any, b: any) => a.position - b.position);
  const notionContent = content?.children
    ?.filter((item: any) => item.type === 'notion')
    .sort((a: any, b: any) => a.position - b.position);
  const contents = [
    {
      id: '1',
      contentType: 'video',
      content: videoContent,
    },
    {
      id: '2',
      contentType: 'notion',
      content: notionContent,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-7">
      <div className="col-span-1 w-full p-4 lg:col-span-7">
        <Card className="border-2 bg-background">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className='bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent'>Edit the content details</CardTitle>
              {!isDisabled ? (
                <Button
                  className="bg-red-500 hover:bg-red-700 dark:text-white"
                  onClick={() => setIsDisabled(true)}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  className="bg-gradient-to-b from-blue-400 to-blue-700 dark:text-white"
                  onClick={() => setIsDisabled(false)}
                >
                  <Pencil size={15} className="mr-2" />
                  {'Edit'}
                </Button>
              )}
            </div>
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
                          placeholder="Enter the content name"
                          {...field}
                          disabled={isDisabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Image url</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 px-3"
                          placeholder="Enter the url of thumbnail"
                          {...field}
                          disabled={isDisabled}
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
                          placeholder="Enter the description of content"
                          {...field}
                          disabled={isDisabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="col-span-1 lg:col-span-2">
                  {contents?.map((item) => (
                    <UploadContentForm
                      key={item.id}
                      courseId={courseId}
                      contentId={contentId}
                      content={item.content}
                      contentType={item.contentType as 'video' | 'notion'}
                    />
                  ))}
                </div>
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
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder="••••••••"
                            disabled={isDisabled}
                            {...field}
                          />
                          <button
                            onClick={() => setIsPasswordVisible((p) => !p)}
                            type="button"
                            className="ml-2 mr-2 text-gray-600"
                          >
                            {isPasswordVisible ? <EyeIcon /> : <EyeOff />}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="lg:col-span-2">
                  <Button className="w-[20%]" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentEditForm;
