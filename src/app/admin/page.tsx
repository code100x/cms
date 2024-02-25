'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

export default function Courses() {
  // TODO: Add validations for few things: imageURL, discordRoleId, etc.
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [id, setId] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [appxCourseId, setAppxCourseId] = useState('');
  const [discordRoleId, setIdDiscordRoleId] = useState('');

  return (
    <div className="justify-between mx-auto p-4 grid grid-cols-1 gap-5 text-center max-w-md">
      <h1 className="text-xl sm:text-2xl md:text-4xl">Admin dashboard </h1>
      <h2 className="text-lg sm:text-xl md:text-3xl">Create a new course</h2>
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="Course name"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="Image url"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="slug"
        onChange={(e) => setSlug(e.target.value)}
      />
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="id"
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="adminSecret"
        onChange={(e) => setAdminSecret(e.target.value)}
      />
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="appx course id"
        onChange={(e) => setAppxCourseId(e.target.value)}
      />
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="dicourd id"
        onChange={(e) => setIdDiscordRoleId(e.target.value)}
      />
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
  );
}
