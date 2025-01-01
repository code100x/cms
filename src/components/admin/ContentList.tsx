'use client';

import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { FileVideo, Grip, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ContentListProps {
  onEdit: (id: string, isEditVideo?: boolean) => void;
  onReorder: (updateData: Array<{ id: string; position: number }>) => void;
  items: any;
}

const ContentList = ({ onReorder, onEdit, items }: ContentListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [contents, setContents] = useState(items);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    setContents(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // to avoid direct mutation, shallow copying of the array
    const items = Array.from(contents);

    // remove the selected content from the array
    const [reOrderedItem] = items.splice(result.source.index, 1);

    // change the original items by replacing the position of the selected item to the desired position
    items.splice(result.destination?.index, 0, reOrderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    // create a new array contains position changed items
    const updatedContents = items.slice(startIndex, endIndex + 1);
    setContents(items);

    const bulkUpdates = updatedContents?.map((content: any) => ({
      id: content.id,
      position: items.findIndex((item: any) => item.id === content.id),
    }));
    onReorder(bulkUpdates);
  };
  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="contents">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {contents?.length > 0 ? (
              contents.map((content: any, index: number) => (
                <Draggable
                  key={content.id}
                  draggableId={content.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        'mt-2 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-slate-700 dark:bg-gray-900 dark:border-black dark:text-white',
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          'rounded-l-md border-r border-r-white px-2 py-3 transition hover:bg-gray-700 dark:border-r-gray-700',
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      {content.title}
                      <div className="ml-auto flex items-center gap-x-2 pr-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Pencil
                                className="h-4 w-4 cursor-pointer transition hover:opacity-75 mr-2"
                                onClick={() => onEdit(content.id)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit content</p>
                            </TooltipContent>
                          </Tooltip>
                          {content.type === 'video' && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <FileVideo
                                  className="h-4 w-4 cursor-pointer transition hover:opacity-75 mr-2"
                                  onClick={() => onEdit(content.id, true)}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit video files</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </TooltipProvider>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="rounded bg-slate-200 p-4 dark:bg-gray-700">
                <p className="text-black dark:text-white">No Contents</p>
              </div>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ContentList;
