import React from 'react';
import { getCommentsWithFullProperties } from '../../actions/comment/index';
import { constructCommentPrismaQuery, paginationData } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import CommentsClient from './CommentsClient';
import { QueryParams } from '@/actions/types';

const CommentsServer = async ({
  content,
  searchParams,
}: {
  content: {
    id: number;
    courseId: number;
    commentCount: number;
    possiblePath: string;
  };
  searchParams: QueryParams;
}) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }

  const paginationInfo = paginationData(searchParams);
  const q = constructCommentPrismaQuery(
    searchParams,
    paginationInfo,
    content.id,
    session.user.id,
  );
  const data = await getCommentsWithFullProperties(q, searchParams.parentId);
  console.log(data);
  if (!content.id) return null;

  return (
    <CommentsClient
      content={content}
      searchParams={searchParams}
      session={session}
      data={data}
    />
  );
};

export default CommentsServer;
