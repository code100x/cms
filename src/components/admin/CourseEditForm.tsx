'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseEditSchema, CourseEditType } from '@/lib/validation/courseSchema';
import { EyeIcon, EyeOff, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { Course } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import ContentForm from '@/components/admin/ChapterForm';
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

interface CourseEditProps {
  course: Course;
  courseContent: any; // TODO: add type for course content
  courseId: number;
}

const CourseEditForm = ({
  course,
  courseContent,
  courseId,
}: CourseEditProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const form = useForm<CourseEditType>({
    resolver: zodResolver(courseEditSchema),
    defaultValues: {
      title: course?.title,
      imageUrl: course?.imageUrl,
      description: course?.description,
      slug: course?.slug,
      appxCourseId: course?.appxCourseId,
      discordRoleId: course?.discordRoleId,
    },
  });
  const onSubmit: SubmitHandler<CourseEditType> = async (
    data: CourseEditType,
  ) => {
    try {
      const res = await axios.patch(`/api/admin/course/${courseId}`, data);
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

  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-7">
      <div className="col-span-1 w-full p-4 lg:col-span-7">
        <Card className="border-2 bg-background">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className='bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-transparent'>Edit the course details</CardTitle>
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
                          placeholder="Enter the Course name"
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
                  name="discordRoleId"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Discord Role Id</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the Discord Role Id"
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
                  name="slug"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 px-3"
                          placeholder="Enter the Course slug"
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
                  name="appxCourseId"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>app x course id</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 px-3"
                          placeholder="Enter the appx course ID"
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
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-12 px-3"
                          placeholder="Enter the Description of course"
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
                  name="imageUrl"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Image url</FormLabel>
                      <FormControl>
                        <Input
                          className="h-12 px-3"
                          placeholder="Enter the url of Image"
                          {...field}
                          disabled={isDisabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="col-span-1 lg:col-span-2">
                  <ContentForm
                    course={course}
                    courseContent={courseContent}
                    courseId={courseId}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="adminSecret"
                  render={({ field }: { field: any }) => (
                    <FormItem className="col-span-1 lg:col-span-2">
                      <FormLabel>Admin Secret</FormLabel>
                      <FormControl>
                        <div className='flex rounded-lg border w-full'>
                          <Input
                            className="h-12 px-3"
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder="••••••••"
                            disabled={isDisabled}
                            {...field}
                          />
                          <button
                            onClick={() => setIsPasswordVisible(p => !p)}
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

export default CourseEditForm;
