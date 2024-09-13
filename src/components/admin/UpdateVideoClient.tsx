'use client';
import { useState } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Video } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

export const UpdateVideoClient = ({
  content,
}: {
  content: {
    type: 'video';
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    markAsCompleted: boolean;
  };
}) => {
  const [link1080, setLink1080] = useState('');
  const [link720, setLink720] = useState('');
  const [link360, setLink360] = useState('');

  const [link1080_mp4, setLink1080_mp4] = useState('');
  const [link720_mp4, setLink720_mp4] = useState('');
  const [link360_mp4, setLink360_mp4] = useState('');

  const [pdfLink, setPdfLink] = useState('');
  const [vttLink, setVttLink] = useState('');

  return (
    <div className="mx-auto max-w-7xl px-4">
      <Accordion
        defaultValue="m3u8-mp4"
        className="rounded-2xl border-2 p-4"
        type="single"
        collapsible
      >
        <AccordionItem value="m3u8-mp4">
          <AccordionTrigger className="p-6 text-lg font-bold lg:text-2xl">
            <div className="flex flex-col gap-4">
              <Video size={40} /> M3U8 and MP4 Links
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-1 gap-4 p-6 lg:grid-cols-7">
              <aside className="col-span-1 lg:col-span-3">
                <p className="text-lg">Add Links</p>
              </aside>

              <aside className="col-span-1 flex flex-col gap-4 lg:col-span-4">
                <Label>M3U8 Links</Label>
                <Input
                  value={link1080}
                  type="text"
                  onChange={(e) => {
                    setLink1080(e.target.value);
                    setLink720(e.target.value.replace('1080', '720'));
                    setLink360(e.target.value.replace('1080', '360'));
                  }}
                  placeholder={'m3u8 1080p'}
                />
                <Input
                  value={link720}
                  type="text"
                  onChange={(e) => {
                    setLink720(e.target.value);
                  }}
                  placeholder={'m3u8 720p'}
                />
                <Input
                  value={link360}
                  type="text"
                  onChange={(e) => {
                    setLink360(e.target.value);
                  }}
                  placeholder={'m3u8 360p'}
                />

                <Label className="mt-4">MP4 Links</Label>

                <Input
                  value={link1080_mp4}
                  type="text"
                  onChange={(e) => {
                    setLink1080_mp4(e.target.value);
                    setLink720_mp4(e.target.value.replace('1080', '720'));
                    setLink360_mp4(e.target.value.replace('1080', '360'));
                  }}
                  placeholder={'m3u8 1080p'}
                />
                <Input
                  value={link720_mp4}
                  type="text"
                  onChange={(e) => {
                    setLink720_mp4(e.target.value);
                  }}
                  placeholder={'m3u8 720p'}
                />
                <Input
                  value={link360_mp4}
                  type="text"
                  onChange={(e) => {
                    setLink360_mp4(e.target.value);
                  }}
                  placeholder={'m3u8 360p'}
                />
                <Button
                  className="my-4 w-full rounded p-2 font-bold text-white lg:w-[20%]"
                  onClick={async () => {
                    await axios.post('/api/admin/updatecontent', {
                      contentId: content.id,
                      updates: {
                        video_360p: link360,
                        video_720p: link720,
                        video_1080p: link1080,
                        video_360p_mp4: link360_mp4,
                        video_720p_mp4: link720_mp4,
                        video_1080p_mp4: link1080_mp4,
                      },
                    });
                  }}
                >
                  Update
                </Button>
              </aside>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="slides">
          <AccordionTrigger className="p-6 text-lg font-bold lg:text-2xl">
            <div className="flex flex-col gap-4">
              <FileText size={40} /> Slides Links
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-1 gap-4 p-6 lg:grid-cols-7">
              <aside className="col-span-1 lg:col-span-3">
                <p className="text-lg">Add Links</p>
              </aside>

              <aside className="col-span-1 flex flex-col gap-4 lg:col-span-4">
                <Input
                  value={pdfLink}
                  type="text"
                  onChange={(e) => {
                    setPdfLink(e.target.value);
                  }}
                  placeholder={'pdf link'}
                />
                <Button
                  className="my-4 w-full rounded p-2 font-bold text-white lg:w-[20%]"
                  onClick={async () => {
                    await axios.post('/api/admin/contentmetadata', {
                      contentId: content.id,
                      updates: {
                        slides: pdfLink,
                      },
                    });
                  }}
                >
                  Update Slide Link
                </Button>
              </aside>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-none" value="vtt">
          <AccordionTrigger className="p-6 text-lg font-bold lg:text-2xl">
            <div className="flex flex-col gap-4">
              <FileText size={40} /> VTT Link
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-1 gap-4 p-6 lg:grid-cols-7">
              <aside className="col-span-1 lg:col-span-3">
                <p className="text-lg">Add Links</p>
              </aside>

              <aside className="col-span-1 lg:col-span-4">
                <Input
                  value={vttLink}
                  type="text"
                  onChange={(e) => {
                    setVttLink(e.target.value);
                  }}
                  placeholder={'vtt link'}
                />
                <Button
                  className="my-4 w-full rounded p-2 font-bold text-white lg:w-[20%]"
                  onClick={async () => {
                    await axios.post('/api/admin/contentmetadata', {
                      contentId: content.id,
                      updates: {
                        subtitles: vttLink,
                      },
                    });
                  }}
                >
                  Update vtt link
                </Button>
              </aside>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
