import React from 'react';
import ApproveComment from './ApproveComment';
import { MessageSquare } from 'lucide-react';

const CommentAdminPage = () => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-7xl flex-col justify-center gap-4 px-4">
      <section className="my-4 flex items-center gap-2 rounded-lg border-2 bg-primary/5 p-4">
        <MessageSquare size={18} />
        <h2 className="text-md font-bold">Comments Mangement</h2>
      </section>
      <ApproveComment />
    </div>
  );
};

export default CommentAdminPage;
