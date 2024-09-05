'use client';

import { useEffect, useRef, useState } from 'react';
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

export const WatchLaterPopup = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [selectedVideoIds, setSelectedVideoIds] = useRecoilState(
    selectedVideoIdsState,
  );
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const [_, setVideoData] = useRecoilState<Content[]>(watchLaterVideoData);
  const { loading, error, videoData } = useFetchWatchLater();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        // @ts-ignore
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        // @ts-ignore
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  return (
    <div className="relative flex w-full items-center justify-between">
      <Button
        ref={buttonRef}
        variant={'outline'}
        onClick={() => {
          setShow(!show);
        }}
      >
        Watch Later
      </Button>
      {show && (
        <div
          style={{
            overflow: 'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
          ref={popupRef}
          className="absolute right-0 top-14 z-30 h-auto max-h-[calc(100vh-3.5rem)] min-h-96 w-full rounded-lg border-2 bg-white p-3 py-2 pt-3 shadow-lg dark:bg-[#020817] md:w-[24rem]"
        >
          <div>
            <SearchBar watchLater={true} />
          </div>
          {loading && (
            <p className="mt-2">
              <VideoSearchLoading />
            </p>
          )}
          {videoData.length === 0 && !loading && (
            <div className="mt-36 flex justify-center">No Video added yet</div>
          )}
          {error && <p>{error}</p>}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable type="group" droppableId="droppableFields">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
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
                                className="mt-4 flex h-16 min-h-fit cursor-pointer gap-6 rounded-xl border border-gray-700/50 p-2"
                              >
                                <div className="">
                                  <img
                                    src={bgImage.src}
                                    alt="background"
                                    className="absolute h-11 w-11 rounded-md"
                                  />
                                </div>
                                <span className="sm:text-md ml-11 flex-wrap overflow-hidden text-ellipsis whitespace-nowrap border-black text-center text-xs capitalize text-white sm:text-lg">
                                  {video.content.title}
                                  <h4 className="text-bold text-xs tracking-normal text-[#64748B]">
                                    Posted on: {formattedDate}
                                  </h4>
                                </span>
                                <span
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleDelete(video.content.id); // Call the delete handler here
                                  }}
                                  className="mt-3 flex hover:text-red-600"
                                >
                                  <MdDelete size={20} />
                                </span>
                                <span
                                  {...provided.dragHandleProps}
                                  className="mt-3 cursor-grab hover:text-gray-400"
                                >
                                  <RxDragHandleHorizontal size={22} />
                                </span>
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
        </div>
      )}
    </div>
  );
};
