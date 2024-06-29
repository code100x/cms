import React from 'react';
import db from '@/db';
import { SelectCourse } from '@/components/admin/SelectCourse';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import LogoutUserComp from '../../components/admin/LogoutUser';
import ToggleDRM from '../../components/admin/ToggleDRM';
import VideoMetaData from '../../components/admin/VideoMetaData';
import DiscordRefresh from '@/components/admin/DiscordRefresh';
import DiscordGetInfo from '@/components/admin/DiscordGetInfo';

async function getCourses() {
  const courses = db.course.findMany();
  return courses;
}

export default async function CourseContent() {
  const courses = await getCourses();
  return (
    <div>
      <div className="h-1/6 w-full rounded-b-lg bg-primary duration-300 hover:p-2">
        <Link href="/admin/create-course">
          <button className="w-full rounded-b-lg border border-white p-2 font-mono text-xl font-extrabold text-white duration-300 hover:bg-white hover:bg-opacity-30">
            Create Course +
          </button>
        </Link>
      </div>
      <div className="mx-auto max-w-screen-xl cursor-pointer justify-between p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-5 w-full text-white dark:text-white md:mb-10">
              Quick Commands
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Tabs defaultValue="logout" className="w-full">
              <TabsList className="grid w-full sm:grid-cols-5">
                <TabsTrigger value="logout">Logout User</TabsTrigger>
                <TabsTrigger value="DRM">DRM</TabsTrigger>
                <TabsTrigger value="discord-refresh">
                  Discord Refresh
                </TabsTrigger>
                <TabsTrigger value="discord-getinfo">
                  Discord GetInfo
                </TabsTrigger>
                <TabsTrigger value="add-metadata">Add MetaData</TabsTrigger>
              </TabsList>
              <TabsContent value="logout">
                <LogoutUserComp />
              </TabsContent>
              <TabsContent value="DRM">
                <ToggleDRM />
              </TabsContent>
              <TabsContent value="discord-refresh">
                <DiscordRefresh />
              </TabsContent>
              <TabsContent value="discord-getinfo">
                <DiscordGetInfo />
              </TabsContent>
              <TabsContent value="add-metadata">
                <VideoMetaData />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
        <SelectCourse courses={courses} />
      </div>
    </div>
  );
}
