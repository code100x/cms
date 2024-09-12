import React from 'react';
import ApproveComment from './ApproveComment';
import { MessageSquare } from 'lucide-react';

const CommentAdminPage = () => {
  return (
    <div className="flex h-[100dvh] gap-4 flex-col px-4 max-w-7xl mx-auto justify-center">
      <section className='flex gap-2 border-2 p-4 bg-primary/5 rounded-lg my-4 items-center'>
        <MessageSquare size={18}/>
        <h2 className='text-md font-bold'>Comments Mangement</h2>
      </section>
      <ApproveComment />
    </div>
  );
};

export default CommentAdminPage;
