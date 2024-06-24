'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInput = {
  title: string;
  imageUrl: string;
  description: string;
  slug: string;
  id: string;
  adminSecret: string;
  appxCourseId: string;
  discordRoleId: string;
};

export default function Courses() {
  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await fetch('/api/admin/course', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <Card className="mx-auto w-full max-w-6xl overflow-y-auto lg:mt-10">
      <CardHeader>
        <CardTitle>Create a new course</CardTitle>
        <CardDescription>Fill in the course details below</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-4 pt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3.5 md:grid-cols-2"
        >
          <Input
            id="name"
            placeholder="Enter the course name"
            required
            {...register('title', { required: true })}
          />
          <Input
            id="image"
            placeholder="Enter the image URL"
            required
            {...register('imageUrl', {
              required: true,
              pattern: /^http[^\\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim,
            })}
          />
          <Textarea
            className="md:col-span-2"
            id="description"
            placeholder="Enter the course description"
            required
            {...register('description', { required: true })}
          />
          <Input
            id="slug"
            placeholder="Enter the course slug"
            required
            {...register('slug', { required: true })}
          />
          <Input
            id="id"
            placeholder="Enter the course ID"
            required
            {...register('id', { required: true })}
          />
          <Input
            id="admin-secret"
            placeholder="Enter the admin secret"
            required
            {...register('adminSecret', { required: true })}
          />
          <Input
            id="appx-course-id"
            placeholder="Enter the appx course ID"
            required
            {...register('appxCourseId', { required: true })}
          />
          <Input
            id="discord-id"
            placeholder="Enter the Discord ID"
            required
            {...register('discordRoleId', { required: true })}
          />
          <div className="flex w-full flex-1 justify-center">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
