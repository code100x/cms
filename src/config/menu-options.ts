import {
  Bookmark,
  History,
  Library,
  LucideIcon,
  MessageSquare,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  const menuList: Group[] = [
    {
      groupLabel: 'Menu',
      menus: [
        {
          href: '/my-courses',
          label: 'My Courses',
          active: pathname === '/my-courses',
          icon: Library,
          submenus: [],
        },
        {
          href: '/bookmark',
          label: 'Bookmarks',
          active: pathname === '/bookmark',
          icon: Bookmark,
          submenus: [],
        },
        {
          href: '/question',
          label: 'Questions',
          active: pathname === '/question',
          icon: MessageSquare,
          submenus: [],
        },
        {
          href: '/watch-history',
          label: 'Watch History',
          active: pathname === '/watch-history',
          icon: History,
          submenus: [],
        },
      ],
    },
  ];
  return menuList;
}
