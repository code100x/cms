'use client';
import React, { useId, useState } from 'react';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';
import { deleteQuestion } from '@/actions/question';
import { deleteAnswer } from '@/actions/answer';
import { ActionState } from '@/lib/create-safe-action';
import { useRouter } from 'next/navigation';
import { Delete } from '@/lib/utils';
import { Trash2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  
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
        router.push('/question');
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmation(true);
  };

  const handleConfirmDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    execute(questionId ? { questionId } : { answerId });
    setShowConfirmation(false);
  };

  const handleCancelDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirmation(false);
  };

  return (
    <div className="flex items-center">
      {!showConfirmation ? (
        <Button
          id={`delete-${idForm}`}
          onClick={handleDeleteClick}
          size="icon"
          variant="destructive"
          type="button"
        >
          <Trash2 className="size-4" />
        </Button>
      ) : (
        <div className="flex space-x-2">
          <Button
            id={`confirm-${idForm}`}
            onClick={handleConfirmDelete}
            size="icon"
            variant="destructive"
            type="button"
          >
            <Check className="size-4" />
          </Button>
          <Button
            id={`cancel-${idForm}`}
            onClick={handleCancelDelete}
            size="icon"
            variant="outline"
            type="button"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeleteQAForm;
