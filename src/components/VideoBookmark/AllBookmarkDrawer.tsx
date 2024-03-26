import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { DrawerState } from '@/store/atoms/drawers';

import { formatTime } from '@/utiles/VideoTimeFormat';
import axios from 'axios';
import { ArrowDownFromLine, BookMarked, Trash2 } from 'lucide-react';
import { useRecoilState } from 'recoil';
import qs from 'query-string';
import { ScrollArea } from '../ui/scroll-area';
import { useEffect, useState } from 'react';
import CircularLoader from '../CircularLoader';
import { useQueryClient } from '@tanstack/react-query';
interface Bookmark {
  id: string;
  userId: string;
  contentId: number;
  timestamp: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export function AllBookmarkDrawer() {
  const queryClient = useQueryClient();
  const [drawer, setDrawer] = useRecoilState(DrawerState);
  const [showContentIcon, setShowContentIcon] = useState<string | null>(null);
  const [isShowingfullDesc, setIsShowingFullDesc] = useState(false);
  const [bookmarkData, setBookmarkData] = useState([]);
  const isOpen = drawer.open && drawer.type === 'AllTimestampBookmark';
  const onClose = (open) => {
    if (!open) {
      setDrawer({
        open: false,
        type: null,
      });
    }
  };

  const handleVideoPlay = (e: Event, bookmark: Bookmark) => {
    e.stopPropagation();
    setDrawer({
      open: false,
      type: null,
      bookmarkData: { title: bookmark.title, timestamp: bookmark.timestamp },
    });
    setIsShowingFullDesc(false);
  };

  const handleDeleteBookmark = async (id: string) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/course/timestampBookmark',
        query: {
          id,
        },
      });
      const { data } = await axios.delete(url);
      setBookmarkData(
        bookmarkData.filter((obj: Bookmark) => obj.id !== data.id),
      );
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ['fetch-videoTimestamp-bookmark'],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseEnter = (bookmark: Bookmark) => {
    if (bookmark.description.length > 34) {
      setShowContentIcon(bookmark.id);
    }
  };

  const handleMouseLeave = () => {
    setShowContentIcon(null);
    setIsShowingFullDesc(false);
  };

  const showFulllength = (e: Event) => {
    e.stopPropagation();
    setIsShowingFullDesc(true);
  };

  const { data } = drawer;

  useEffect(() => {
    if (data) {
      setBookmarkData(data?.bookmarkData);
    }
  }, [data]);
  return (
    <Drawer open={isOpen} direction="right" onOpenChange={onClose}>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[350px] rounded-none outline-none border-none">
        <div>
          <DrawerHeader className="my-2">
            <DrawerTitle className="text-[#1D4ED8] flex items-center">
              <span className="mr-2">
                <BookMarked />
              </span>
              <p className="text-[24px] ">Bookmarks</p>
            </DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-screen pb-[4rem]">
            {data && data.isLoading ? (
              <div className="flex justify-center pt-10">
                <CircularLoader />
              </div>
            ) : (
              <div className="mx-4">
                {data &&
                  bookmarkData?.map((bookmark: Bookmark) => {
                    return (
                      <div
                        className="text-white border p-2 rounded cursor-pointer my-4 transition-all duration-600 ease-in-out hover:bg-gray-900"
                        key={bookmark.id}
                        onClick={(e) => handleVideoPlay(e, bookmark)}
                        onMouseEnter={() => handleMouseEnter(bookmark)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="flex justify-between">
                          <span className=" bg-green-300 text-[12px]  text-[#1D4ED8] border-[#1D4ED8] border py-1 px-2 rounded-full font-bold">
                            At {formatTime(bookmark.timestamp)}
                          </span>
                          <Trash2
                            size={20}
                            className="transition-all duration-600 ease-in-out  hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBookmark(bookmark.id);
                            }}
                          />
                        </div>
                        <div className="ml-1">
                          <p className="text-[18px] capitalize font-semibold mt-2">
                            {bookmark.title}
                          </p>
                          {isShowingfullDesc &&
                          showContentIcon === bookmark.id ? (
                              <p className=" mt-1 text-[16px] text-gray-400 ">
                                {bookmark.description}{' '}
                              </p>
                            ) : (
                              <div className="mt-1 flex items-center justify-between">
                                <p className="text-[16px] text-gray-400 ">
                                  {bookmark.description.substring(0, 34)}
                                  {bookmark.description.length > 34 && '...'}{' '}
                                </p>
                                {bookmark.description.length > 34 &&
                                showContentIcon === bookmark.id && (
                                  <ArrowDownFromLine
                                    size={15}
                                    className="mt-[8px]"
                                    onClick={(e) => showFulllength(e)}
                                  />
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
