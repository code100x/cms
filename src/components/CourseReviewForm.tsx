'use client';
import React, { useEffect, useState } from 'react';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/useAction';
import { createReview, getReview } from '@/actions/review';
import { toast } from 'sonner';
import { FormErrors } from './FormError';
import { usePathname } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

interface ReviewData {
  id: number;
  content: string;
  courseId: number;
  rating: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const CourseReviewInputForm = ({ courseId }: { courseId: number }) => {
  const [ratingNum, setRatingNum] = useState(0);
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const [review, setReview] = useState<ReviewData>();
  const currentPath = usePathname();
  const formRef = React.useRef<HTMLFormElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const fetchReview = async () => {
    setIsReviewLoading(true);
    try {
      const review = await getReview(courseId);
      if (review) {
        setReview(review);
      }
    } catch (error) {
      toast.error('Failed to get review!');
    } finally {
      setIsReviewLoading(false);
    }
  };
  useEffect(() => {
    fetchReview();
  }, [courseId]);

  const { execute, isLoading, fieldErrors } = useAction(createReview, {
    onSuccess: async () => {
      toast.success('Review created successfully');
      formRef.current?.reset();
      await fetchReview();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get('content') as string;
    execute({
      content,
      ratingNum,
      courseId,
      currentPath,
    });
  };

  if (isReviewLoading) {
    return (
      <div>
        <Skeleton className="mb-4 h-7 w-44 bg-primary/10" />
        <Skeleton className="h-20 w-full bg-primary/10" />
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-7 truncate text-xl font-bold capitalize md:text-2xl">
        {review ? 'Your review' : 'Leave a review...'}
      </h3>
      {review && (
        <h4 className="mb-7 truncate text-lg font-medium md:text-2xl">
          {review.content}
        </h4>
      )}
      {!review && (
        <>
          <div className="ml-3 flex">
            {[1, 2, 3, 4, 5].map((value) => {
              return value <= ratingNum ? (
                <TiStarFullOutline
                  onClick={() => setRatingNum(value)}
                  key={value}
                  className="cursor-pointer text-2xl text-blue-600"
                />
              ) : (
                <TiStarOutline
                  onClick={() => setRatingNum(value)}
                  key={value}
                  className="cursor-pointer text-2xl text-blue-600"
                />
              );
            })}
            ;
          </div>
          <form
            className="flex flex-col gap-4 rounded-xl"
            onSubmit={handleFormSubmit}
            ref={formRef}
          >
            <textarea
              ref={textareaRef}
              id="content"
              name="content"
              className="w-full resize-none border-b border-primary/25 bg-transparent p-4 focus:outline-none focus:ring-0"
              placeholder="Add a review..."
            />
            <FormErrors id="content" errors={fieldErrors} />
            <Button type="submit" disabled={isLoading} className="w-fit">
              Create
            </Button>
          </form>
        </>
      )}
    </div>
  );
};
