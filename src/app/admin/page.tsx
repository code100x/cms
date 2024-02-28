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
import React, { useState } from 'react';

export default function Courses() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [id, setId] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [appxCourseId, setAppxCourseId] = useState('');
  const [discordRoleId, setIdDiscordRoleId] = useState('');

  return (
    <Card className="w-full max-w-6xl mx-auto mt-4 overflow-y-auto">
      <CardHeader>
        <CardTitle>Create a new course</CardTitle>
        <CardDescription>Fill in the course details below</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form className="grid gap-3.5 md:grid-cols-2">
          <Input
            id="name"
            placeholder="Enter the course name"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            id="image"
            placeholder="Enter the image URL"
            required
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Textarea
            className="md:col-span-2"
            id="description"
            placeholder="Enter the course description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            id="slug"
            placeholder="Enter the course slug"
            required
            onChange={(e) => setSlug(e.target.value)}
          />
          <Input
            id="id"
            placeholder="Enter the course ID"
            required
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            id="admin-secret"
            placeholder="Enter the admin secret"
            required
            onChange={(e) => setAdminSecret(e.target.value)}
          />
          <Input
            id="appx-course-id"
            placeholder="Enter the appx course ID"
            required
            onChange={(e) => setAppxCourseId(e.target.value)}
          />
          <Input
            id="discord-id"
            placeholder="Enter the Discord ID"
            required
            onChange={(e) => setIdDiscordRoleId(e.target.value)}
          />
        </form>
        <div className="flex w-full justify-end">
          <Button
            onClick={async () => {
              await fetch('/api/admin/course', {
                body: JSON.stringify({
                  id,
                  title,
                  imageUrl,
                  description,
                  slug,
                  adminSecret,
                  appxCourseId,
                  discordRoleId,
                }),
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            }}
          >
            Create
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // return (
  //   <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
  //     Admin dashboard Create a new course
  //     <input
  //       className="text-black"
  //       type="text"
  //       placeholder="Course name"
  //       onChange={(e) => setTitle(e.target.value)}
  //     />
  //     <input
  //       className="text-black"
  //       type="text"
  //       placeholder="Image url"
  //       onChange={(e) => setImageUrl(e.target.value)}
  //     />
  //     <input
  //       className="text-black"
  //       type="text"
  //       placeholder="Description"
  //       onChange={(e) => setDescription(e.target.value)}
  //     />
  //     <input
  //       className="text-black"
  //       type="text"
  //       placeholder="slug"
  //       onChange={(e) => setSlug(e.target.value)}
  //     />
  //     <input
  //       className="text-black"
  //       type="text"
  //       placeholder="id"
  //       onChange={(e) => setId(e.target.value)}
  //     />
  //     <input
  //       className="text-black"
  //       type="text"
  //       placeholder="adminSecret"
  //       onChange={(e) => setAdminSecret(e.target.value)}
  //     />
  //     <input
  //       className="text-black"
  //       type="text"
  //       placeholder="appx course id"
  //       onChange={(e) => setAppxCourseId(e.target.value)}
  //     />
  //     <input
  //       className="text-black"
  //       type="text"
  //       placeholder="dicourd id"
  //       onChange={(e) => setIdDiscordRoleId(e.target.value)}
  //     />
  //     <button
  //       onClick={async () => {
  //         await fetch('/api/admin/course', {
  //           body: JSON.stringify({
  //             id,
  //             title,
  //             imageUrl,
  //             description,
  //             slug,
  //             adminSecret,
  //             appxCourseId,
  //             discordRoleId,
  //           }),
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         });
  //       }}
  //     >
  //       Create
  //     </button>
  //   </div>
  // );
}
