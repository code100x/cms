'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, PencilIcon } from 'lucide-react';

import { useState } from 'react';
import DeleteBookmarkModal from './DeleteBookmarkModal';

const BookmarkCardDropdown = ({
  onOpenEditModal,
  id,
}: {
  onOpenEditModal: () => void;
  id: number;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger>{<MoreVertical />}</DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 mt-1 ">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onOpenEditModal();
              setIsMenuOpen(false);
            }}
          >
            <PencilIcon className="mr-3 float-right w-3.5 h-3.5" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-700 focus:text-red-700">
            <DeleteBookmarkModal
              onClose={() => {
                setIsMenuOpen(false);
              }}
              id={id}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BookmarkCardDropdown;
