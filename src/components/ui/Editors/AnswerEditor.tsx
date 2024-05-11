'use client';
import { contentAtom } from '@/store/atoms';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import './DoubtEditor.css';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';
import { createAnswer } from '@/actions/doubt';
import { useRouter } from 'next/navigation';
import { FormErrors } from '@/components/FormError';

const DoubtEditor = dynamic(
  () => import('@/components/ui/Editors/DoubtEditor'),
  { ssr: false },
);

export default ({ doubtId }: { doubtId: string }) => {
  const [loading, setLoading] = useState(false);
  const [contentValue, setContent] = useRecoilState(contentAtom);
  const router = useRouter();
  const { execute, fieldErrors } = useAction(createAnswer, {
    onError(error) {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success('Answer submitted successfully!');
      setContent('');
      router.refresh();
    },
  });
  function onSubmit() {
    setLoading(true);
    execute({
      doubtId,
      content: contentValue,
    });
    setLoading(false);
  }
  return (
    <div className="w-5/6 my-6">
      <DoubtEditor />
      <FormErrors id="adminPassword" errors={fieldErrors} />
      <div className="w-1/2 flex justify-end">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 my-4"
            onClick={onSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
