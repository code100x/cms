"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const ClearFilter = () => {
  const searchParams = useSearchParams();
  const hasTags = searchParams.get('tags');

  return (
    hasTags && (
      <form action={"/question"} method='GET'>
      <Button  variant="secondary"
        className='w-36 hover:bg-red-900'
      >
        <X size={16} className='mr-2'/>
        Clear Filters
      </Button>
      </form>
    )
  );
};
