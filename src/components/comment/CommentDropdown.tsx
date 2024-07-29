'use client';
import { useState } from 'react';
import CommentPinForm from './CommentPinForm';
import CommentApproveForm from './CommentApproveForm';
import CommentUpdateForm from './CommentUpdateForm';
import CommentDeleteForm from './CommentDeleteForm';
import CopyToClipboard from '../Copy-to-clipbord';
import { ExtendedComment } from '@/actions/comment/types';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MoreVerticalIcon } from 'lucide-react';
import { ROLES } from '@/actions/types';

const CommentDropdown = ({ session, c }: any) => {
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <DropdownMenu
      key="2"
      open={dropOpen}
      onOpenChange={setDropOpen}
      modal={false}
    >
      <DropdownMenuTrigger asChild>
        <button
          onClick={(e) => {
            e.preventDefault();
            setDropOpen(true);
          }}
          className="flex"
        >
          <MoreVerticalIcon className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div className="flex items-center justify-center">
            <CopyToClipboard textToCopy={`${c.contentId};${c.id.toString()}`} />
          </div>
        </DropdownMenuItem>
        {(session.user.id.toString() ===
          (c as ExtendedComment).userId.toString() ||
          session.user.role === ROLES.ADMIN) && (
          <DropdownMenuItem>
            <CommentDeleteForm commentId={c.id} />
          </DropdownMenuItem>
        )}
        {(session.user.id.toString() ===
          (c as ExtendedComment).userId.toString() ||
          session.user.role === ROLES.ADMIN) && (
          <DropdownMenuItem asChild>
            <CommentUpdateForm
              commentId={c.id}
              comment={c.content}
              setDropOpen={setDropOpen}
            />
          </DropdownMenuItem>
        )}
        {session.user.role === ROLES.ADMIN && (
          <DropdownMenuItem>
            <CommentPinForm commentId={c.id} contentId={c.contentId} />
          </DropdownMenuItem>
        )}
        {session.user.role === ROLES.ADMIN && (
          <DropdownMenuItem>
            <CommentApproveForm commentId={c.id} contentId={c.contentId} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentDropdown;
