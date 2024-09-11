'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { Button } from '../ui/button';
import SearchBar from '../search/SearchBar';
import {
  Content,
  selectedVideoIdsState,
  watchLaterVideoData,
} from '@/store/atoms/watchlater';
import bgImage from '../../../public/Content-Cover.png';
import { MdDelete } from 'react-icons/md';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { RxDragHandleHorizontal } from 'react-icons/rx';
import { useFetchWatchLater } from '@/hooks/useWatchLater';
import { deleteWatchLater } from '@/utiles/delete-watch-later';
import { updateWatchLaterOrder } from '@/utiles/update-watch-later-order';
import VideoSearchLoading from '../search/VideoSearchLoading';
import { AnimatePresence, motion } from 'framer-motion';
import {X, Clock } from 'lucide-react';

const sidebarVariants = {
  open: {
    width: '100%',
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    width: 0,
    opacity: 0,
    x: '100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export const WatchLaterPopup = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [selectedVideoIds, setSelectedVideoIds] = useRecoilState(
    selectedVideoIdsState,
  );

  const [_, setVideoData] = useRecoilState<Content[]>(watchLaterVideoData);
  const { loading, error, videoData } = useFetchWatchLater();

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(videoData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const ids = items.map((val) => val.content.id);
    updateWatchLaterOrder(ids);
    setVideoData(items);
  };
  const handleDelete = async (contentId: number) => {
    await deleteWatchLater(contentId, setSelectedVideoIds, setVideoData);
  };

  const handleFirstVideo = () => {
    const {parent,parentId,id} = videoData[0].content;
    if (parentId && parent) {
    const courseId = parent.courses[0]?.courseId;
    const videoUrl = `/courses/${courseId}/${parentId}/${id}`;
    router.push(videoUrl);
    }
  };

  return (
    <div className="relative flex w-full items-center justify-between">
      <Button
        onClick={() => {
          setShow(!show);
        }}
        className="w-fit gap-2"
      >
        {show ? <X className="size-5" /> : <Clock className="size-5" />}
        Watch Later
      </Button>
      <AnimatePresence>
        {show && (
          <motion.div
            key="sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed right-0 top-0 z-[99999] flex h-screen w-full flex-col gap-4 overflow-y-auto rounded-r-lg border-l border-primary/10 bg-neutral-50 dark:bg-neutral-900 md:max-w-[25vw]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 p-5">
              <h4 className="text-xl font-bold tracking-tighter text-primary lg:text-2xl">
                Watch Later
              </h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShow(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="w-full p-3 pb-0">
              <SearchBar watchLater={true} />
            </div>
            {loading && (
              <p className="mt-2">
                <VideoSearchLoading />
              </p>
            )}
            {videoData.length === 0 && !loading && (
              <div className="mt-36 flex justify-center">
                No Video added yet
              </div>
            )}
            {error && <p>{error}</p>}
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable type="group" droppableId="droppableFields">
                {(provided) => (
                  <div
                    className="p-3 pt-0"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {!loading &&
                      videoData.map((video, index) => {
                        const { parent, parentId } = video.content;
                        if (parentId && parent) {
                          const courseId = parent.courses[0]?.courseId;
                          const videoUrl = `/courses/${courseId}/${parentId}/${video.content.id}`;

                          const formattedDate = video?.content.createdAt
                            ? new Date(
                                video?.content.createdAt,
                              ).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              })
                            : 'No date provided';
                          return (
                            <Draggable
                              key={video.content.id}
                              draggableId={video.content.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  onClick={() => router.push(videoUrl)}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="mt-4 flex h-16 min-h-fit cursor-pointer justify-between gap-6 rounded-xl border border-gray-700/50 p-2"
                                >
                                  <div className="flex gap-4">
                                    <img
                                      src={bgImage.src}
                                      alt="background"
                                      className="h-11 w-11 rounded-md"
                                    />
                                    <span className="sm:text-md md:whitespace-wrap xl:whitespace-nowrap overflow-hidden text-ellipsis border-black text-center text-xs capitalize text-white sm:text-lg">
                                      {video.content.title}
                                      <h4 className="text-bold text-xs tracking-normal text-[#64748B]">
                                        Posted on: {formattedDate}
                                      </h4>
                                    </span>
                                  </div>
                                  <div className="flex gap-6 sm:gap-2 md:gap-4">
                                    <span
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleDelete(video.content.id);
                                      }}
                                      className="mt-3 flex hover:text-red-600"
                                    >
                                      <MdDelete size={20} />
                                    </span>
                                    <span
                                      {...provided.dragHandleProps}
                                      className="mr-5 mt-3 cursor-grab hover:text-gray-400"
                                    >
                                      <RxDragHandleHorizontal size={23} />
                                    </span>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        }
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="p-3 w-full absolute bottom-0">
              <Button
                onClick={handleFirstVideo}
                className="w-full gap-2"
              >
                Start
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
