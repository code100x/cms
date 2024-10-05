'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { isValidJsonString } from '@/utiles/is-valid-json';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Cuboid, Flag, ToggleRight } from 'lucide-react';

export default function DiscordPage() {
  const [email, setEmail] = useState('');
  const [segmentsJson, setSegmentsJson] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [contentId, setContentId] = useState('');
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4">
      <section className="my-4 flex items-center gap-2 rounded-lg border-2 bg-primary/5 p-4">
        <Flag size={18} />
        <h2 className="text-md font-bold">User Flags</h2>
      </section>

      <Accordion
        defaultValue="toggle-drm"
        className="rounded-2xl border-2 p-4"
        type="single"
        collapsible
      >
        <AccordionItem className="p-6" value="toggle-drm">
          <AccordionTrigger className="text-lg font-bold lg:text-2xl">
            <div className="flex flex-col gap-4">
              <ToggleRight size={40} /> Toggle DRM
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <section className="grid w-full grid-cols-1 py-4 lg:grid-cols-7">
              <aside className="col-span-2 lg:col-span-3">
                <h1 className="text-lg">Toggle DRM</h1>
              </aside>

              <aside className="col-span-1 lg:col-span-4">
                <form className="flex w-full flex-col gap-5 rounded-xl">
                  <Input
                    placeholder="email"
                    className="h-14 px-4 text-lg dark:text-white"
                    type=" text"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="admin secret"
                    className="h-14 px-4 text-lg dark:text-white"
                    type=" text"
                    onChange={(e) => {
                      setAdminSecret(e.target.value);
                    }}
                  />

                  <Button
                    className="w-full rounded px-4 py-2 font-bold text-white"
                    onClick={async () => {
                      await fetch('/api/admin/drm', {
                        body: JSON.stringify({
                          adminSecret,
                          email,
                          disableDrm: false,
                        }),
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                    }}
                  >
                    Enable DRM
                  </Button>
                  <Button
                    className="w-full rounded px-4 py-2 font-bold text-white"
                    onClick={async () => {
                      await fetch('/api/admin/drm', {
                        body: JSON.stringify({
                          adminSecret,
                          email,
                          disableDrm: true,
                        }),
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                    }}
                  >
                    Disable DRM
                  </Button>
                </form>
              </aside>
            </section>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-none p-6" value="add-metadata">
          <AccordionTrigger className="text-lg font-bold lg:text-2xl">
            <div className="flex flex-col gap-4">
              <Cuboid size={40} /> Add metadata
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <section className="grid w-full grid-cols-1 py-4 lg:grid-cols-7">
              <aside className="col-span-2 lg:col-span-3">
                <h1 className="text-lg">Add metadata</h1>
              </aside>

              <aside className="col-span-1 lg:col-span-4">
                <div className="flex flex-col gap-5 rounded-lg">
                  <Textarea
                    // style={{ width: 800 }}
                    rows={10}
                    placeholder="Segments (JSON)"
                    className="text-lg"
                    onChange={(e) => {
                      setSegmentsJson(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Admin Secret"
                    className="h-14 text-lg"
                    type=" text"
                    onChange={(e) => {
                      setAdminSecret(e.target.value);
                    }}
                  />
                  <Input
                    placeholder="Content Id"
                    className="h-14 text-lg"
                    type=" text"
                    onChange={(e) => {
                      setContentId(e.target.value);
                    }}
                  />

                  <h1>JSON is validated in the form.</h1>
                  <Button
                    className="w-full rounded px-4 py-2 font-bold text-white lg:w-[20%]"
                    onClick={async () => {
                      if (!isValidJsonString(segmentsJson)) {
                        return toast.warning('Not a valid JSON');
                      }

                      await fetch('/api/admin/segments', {
                        body: JSON.stringify({
                          adminSecret,
                          contentId,
                          segmentsJson,
                        }),
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                    }}
                  >
                    Add segments
                  </Button>
                  <br />
                </div>
              </aside>
            </section>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
