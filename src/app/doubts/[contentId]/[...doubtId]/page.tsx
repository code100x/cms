import { getDoubt } from '@/actions/doubt';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnswerEditor from '@/components/ui/Editors/AnswerEditor';

import HtmlRenderer from '@/components/ui/html-renderer';
import dayjs from 'dayjs';

export default async ({
  params,
}: {
  params: { doubtId: string; contentId: string };
}) => {
  const doubtId: string = params.doubtId[0];
  const doubt = (await getDoubt(doubtId)).data;

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="p-10">
        <div className="flex mb-2">
          <Avatar className="w-10 h-10 border">
            <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
            <AvatarFallback>{`${doubt?.user?.name?.substring(0, 2)}`}</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <div className="font-semibold">@{doubt?.user?.name ?? ''}</div>
            <div className="text-gray-500 text-xs dark:text-gray-400">
              {dayjs(doubt?.createdAt).format('DD MMM YYYY')}
            </div>
            <HtmlRenderer
              htmlContent={doubt?.htmlContent ? doubt?.htmlContent : ''}
            />
          </div>
        </div>
      </div>
      <hr className="my-4 w-screen h-0.5 bg-white" />
      {doubt?.Answer?.map((answer) => (
        <div className="p-4 border-8 mx-8 my-4">
          <div className="flex mb-2">
            <Avatar className="w-10 h-10 border">
              <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
              <AvatarFallback>{`${answer?.user?.name?.substring(0, 2)}`}</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <div className="font-semibold">@{answer?.user?.name ?? ''}</div>
              <div className="text-gray-500 text-xs dark:text-gray-400">
                {dayjs(answer?.createdAt).format('DD MMM YYYY')}
              </div>
              <HtmlRenderer
                htmlContent={answer?.htmlContent ? answer?.htmlContent : ''}
              />
            </div>
          </div>
        </div>
      ))}
      <hr className="my-4 w-screen h-0.5 bg-white" />
      <div className="w-screen flex justify-center">
        <AnswerEditor doubtId={doubtId} />
      </div>
    </div>
  );
};
