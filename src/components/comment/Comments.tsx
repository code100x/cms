import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { QueryParams } from '@/actions/types';
import {
  constructCommentPrismaQuery,
  getUpdatedUrl,
  paginationData,
} from '@/lib/utils';
import CommentInputForm from './CommentInputForm';
import { getComments } from '../../actions/comment/index';
import { ExtendedComment } from '@/actions/comment/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CommentVoteForm from './CommentVoteForm';
import Pagination from '../Pagination';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import TimeCodeComment from './TimeCodeComment';
import CopyToClipboard from '../Copy-to-clipbord';
dayjs.extend(relativeTime);
const Comments = async ({
  content,
  searchParams,
}: {
  content: {
    id: number;
    commentCount: number;
    possiblePath: string;
  };
  searchParams: QueryParams;
}) => {
  const paginationInfo = paginationData(searchParams);
  const q = constructCommentPrismaQuery(
    searchParams,
    paginationInfo,
    content.id,
  );

  const data = await getComments(q, searchParams.parentId);

  if (!content.id) return null;
  const modifiedSearchParams = { ...searchParams };
  delete modifiedSearchParams.parentId;

  return (
    <Card key="1" className="w-full border-none max-w-[90vw]">
      <CardHeader className="p-6">
        {data.parentComment && (
          <Link
            className="p-1 "
            href={getUpdatedUrl(
              `/courses/${content.possiblePath}`,
              modifiedSearchParams,
              {},
            )}
            scroll={false}
          >
            <div className="flex gap-2">
              <ArrowLeftIcon /> Go back
            </div>
          </Link>
        )}
        <div className="grid gap-2">
          {data.parentComment && (
            <h1 className="text-xl font-bold">
              <TimeCodeComment
                possiblePath={content.possiblePath}
                searchParams={searchParams}
                comment={data.parentComment.content}
              />
            </h1>
          )}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-0.5">
              {/* <ChevronUpIcon className="w-4 h-4" />
              <ChevronDownIcon className="w-4 h-4" /> */}
            </div>
            {data.parentComment && (
              <>
                <div className="text-gray-500 dark:text-gray-400">
                  {data.parentComment.upvotes} Likes
                </div>
                <div className="text-gray-500 dark:text-gray-400">•</div>
              </>
            )}

            <div className="text-gray-500 dark:text-gray-400">
              {!data.parentComment
                ? `${content.commentCount} comments`
                : `${data.parentComment.repliesCount} replies`}
            </div>
            {/*   <div className="text-gray-500 dark:text-gray-400">•</div>
            <div className="text-gray-500 dark:text-gray-400">Share</div> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CommentInputForm
          contentId={content.id}
          parentId={data?.parentComment?.id}
        />
        <div className="grid gap-6">
          {data.comments.map((c) => (
            <div className="text-sm flex items-start gap-4" key={c.id}>
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="grid gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">
                      @{(c as ExtendedComment).user.name}
                    </div>
                    <div className="text-gray-500 text-xs dark:text-gray-400">
                      {dayjs(c.createdAt).fromNow()}
                    </div>
                    <CopyToClipboard
                      textToCopy={`${c.contentId};${c.id.toString()}`}
                    />
                  </div>
                  <div>
                    <TimeCodeComment
                      possiblePath={content.possiblePath}
                      searchParams={searchParams}
                      comment={c.content}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <CommentVoteForm
                      upVotes={c.upvotes}
                      downVotes={c.downvotes}
                      commentId={c.id}
                    />
                    {!data.parentComment && (
                      <Link
                        href={getUpdatedUrl(
                          `/courses/${content.possiblePath}`,
                          searchParams,
                          {
                            parentId: c.id,
                          },
                        )}
                        scroll={false}
                        className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
                      >
                        <ReplyIcon className="w-4 h-4" />
                        <span>{c.repliesCount}</span>
                        <span>Reply</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Pagination dataLength={data.comments.length} />
      </CardFooter>
    </Card>
  );
};

// function ChevronDownIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m6 9 6 6 6-6" />
//     </svg>
//   );
// }

// function ChevronUpIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m18 15-6-6-6 6" />
//     </svg>
//   );
// }

function ReplyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

export default Comments;
