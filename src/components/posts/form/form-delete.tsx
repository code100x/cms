'use client';
import React, { useId } from 'react';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';

import { deleteQuestion } from '@/actions/question';
import { deleteAnswer } from '@/actions/answer';
import { ActionState } from '@/lib/create-safe-action';

import { useRouter } from 'next/navigation';
import { Delete } from '@/lib/utils';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
interface IVoteFormProps {
  questionId: number | undefined;
  answerId: number | undefined;
}
type DeleteActionData = { questionId?: number; answerId?: number };
type DeleteAction = (
  data: DeleteActionData,
) => Promise<ActionState<DeleteActionData, Delete>>;

const DeleteQAForm: React.FC<IVoteFormProps> = ({ questionId, answerId }) => {
  const idForm = useId();
  const router = useRouter();
  const deleteAction: DeleteAction = async ({ questionId, answerId }) => {
    if (questionId) {
      return deleteQuestion({ questionId });
    } else if (answerId) {
      return deleteAnswer({ answerId });
    }
    throw new Error('Neither questionId nor answerId is provided');
  };

  const { execute } = useAction(deleteAction, {
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      if (questionId) {
        router.push('/questions');
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const hanleDeleteFunction = () => {
    execute(questionId ? { questionId } : { answerId });
  };

  return (
    <form
      id={`delete-${idForm}`}
      action={hanleDeleteFunction}
      className="w-full"
    >
      <button type="submit">
        <DropdownMenuItem className="rounded-xl px-1 py-2 text-sm hover:border-none hover:outline-none">
          Delete
        </DropdownMenuItem>
      </button>
    </form>
  );
};

export default DeleteQAForm;
