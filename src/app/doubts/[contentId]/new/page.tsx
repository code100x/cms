'use client';
import React from 'react';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRecoilState } from 'recoil';
import { contentAtom } from '@/store/atoms';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAction } from '@/hooks/useAction';
import { createDoubt } from '@/actions/doubt';
import { FormErrors } from '@/components/FormError';

const DoubtEditor = dynamic(
  () => import('@/components/ui/Editors/DoubtEditor'),
  { ssr: false },
);

export default () => {
  const [contentValue, setContent] = useRecoilState(contentAtom);
  const params = useParams();
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const router = useRouter();
  const { execute, fieldErrors } = useAction(createDoubt, {
    onError(error) {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success('Doubt submitted successfully!');
      setContent('');
      router.push(`/doubts/${params.contentId}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await execute({
      title,
      content: contentValue,
      contentId: Number(params.contentId),
      description,
    });
    setLoading(false);
  };
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl text-center text-transparent bg-clip-text bg-gradient-to-r text-white light:text-black my-3">
        New Doubt
      </h1>
      <div className="flex items-center flex-col">
        <div className="w-1/2 text-left">
          <form onSubmit={handleSubmit}>
            <Input
              className="mt-10 mb-5"
              placeholder="title"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Textarea
              className="my-5"
              id="description"
              placeholder="Short Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <DoubtEditor />
            <FormErrors id="content" errors={fieldErrors} />
            <div className="w-1/2 flex justify-end">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 my-4"
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
