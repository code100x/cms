import { SideNavItem } from '@/types/sideBarItems';
import { BookmarkIcon, History, MessageCircle, Monitor } from 'lucide-react';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'My Courses',
    path: '/my-courses',
    icon: <Monitor width="18" height="18" />,
  },
  {
    title: 'Bookmarks',
    path: '/bookmark',
    icon: <BookmarkIcon width="18" height="18" />,
  },
  {
    title: 'Questions',
    path: '/question',
    icon: <MessageCircle width="18" height="18" />,
  },
  {
    title: 'Watch History',
    path: '/watch-history',
    icon: <History width="18" height="18" />,
  },

  // example for submenu items
  // {
  //   title: 'Projects',
  //   path: '/projects',
  //   icon: <Icons.folder width="18" height="18" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: 'All', path: '/projects' },
  //     { title: 'Web Design', path: '/projects/web-design' },
  //     { title: 'Graphic Design', path: '/projects/graphic-design' },

  //   ],
  // },
];
