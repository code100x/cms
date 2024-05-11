import { getDoubts } from '@/actions/doubt';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async ({ params }: { params: { contentId: String } }) => {
  const contentId: Number = Number(params.contentId);
  const doubts = await getDoubts(contentId as number);
  return (
    <div className="overflow-x-hidden">
      <div className="w-screen flex justify-end">
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 my-4 mr-6"
          href={`/doubts/${contentId}/new`}
        >
          Ask Doubt
        </a>
      </div>
      <div>
        {!doubts.data || doubts.data.length === 0 ? (
          <div>
            <h2 className="text-lg font-bold flex justify-center">
              No doubts found
            </h2>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {doubts.data.map((doubt) => (
              <Link
                key={doubt.id}
                href={`/doubts/${doubt.contentId}/${doubt.id}`}
                className="w-full flex justify-center"
              >
                <div key={doubt.id} className="w-4/5 border-8 p-4 my-4">
                  <div className="flex mb-2">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                      <AvatarFallback>{`${doubt.user?.name?.substring(0, 2)}`}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <div className="font-semibold">
                        @{doubt.user?.name ?? ''}
                      </div>
                      <div className="text-gray-500 text-xs dark:text-gray-400">
                        {dayjs(doubt.createdAt).format('DD MMM YYYY')}
                      </div>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold ml-2">{doubt.title}</h2>
                  <p className="ml-2 mt-1">{doubt.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
