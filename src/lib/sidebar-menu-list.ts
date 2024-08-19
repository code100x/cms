import {
  Bookmark,
  History,
  LucideIcon,
  MessageSquare,
  StickyNote,
} from 'lucide-react';

type menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

export function getMenuList(pathname: string): menu[] {
  return [
    {
      href: '/',
      label: 'My Courses',
      active: pathname.includes('/' || '/courses'),
      icon: StickyNote,
    },
    {
      href: '/resources',
      label: 'Resources',
      active: pathname.includes('/resources'),
      icon: StickyNote,
    },
    {
      href: '/bookmarks',
      label: 'Bookmarks',
      active: pathname.includes('/bookmarks'),
      icon: Bookmark,
    },
    {
      href: '/questions',
      label: 'Questions',
      active: pathname.includes('/questions'),
      icon: MessageSquare,
    },
    {
      href: '/history',
      label: 'Watch History',
      active: pathname.includes('/history'),
      icon: History,
    },
  ];
}
