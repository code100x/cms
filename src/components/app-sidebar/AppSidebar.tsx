import { useSidebar } from '@/contexts/sidebarContext';
import {
  BookmarkIcon,
  ChevronRight,
  Files,
  FileStack,
  HelpCircle,
  History,
  LogOut,
  MessageSquare,
} from 'lucide-react';
import AppSidebarItem from './AppSidebarItem';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const sidebarItems = [
  { id: 'courses', icon: Files, text: 'My Courses', alert: false },
  { id: 'resources', icon: FileStack, text: 'Resources', alert: false },
  { id: 'bookmarks', icon: BookmarkIcon, text: 'Bookmarks', alert: false },
  { id: 'questions', icon: MessageSquare, text: 'Questions', alert: false },
  {
    id: 'watch-history',
    icon: History,
    text: 'Watch History',
    alert: false,
  },
] as const;

const AppSidebar = () => {
  const { expanded, toggleExpanded } = useSidebar();
  const { data: session } = useSession();

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout');
  };

  return (
    <aside className="h-[calc(100vh-64px)]">
      <nav className="flex h-full flex-col border-r border-border shadow-sm">
        <div className="mb-4 flex items-center justify-between p-4 pb-2">
          <p
            className={`text-xl font-semibold capitalize ${!expanded ? 'hidden' : 'block'}`}
          >
            Hi, {session?.user?.name}
          </p>
          <button onClick={toggleExpanded} className="rounded-lg p-1.5">
            <ChevronRight
              className={expanded ? 'h-6 w-6 -scale-x-100' : 'h-6 w-6'}
            />
          </button>
        </div>

        <ul className="flex-1 px-3">
          {sidebarItems.map((item) => (
            <AppSidebarItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              text={item.text}
              alert={item.alert}
            />
          ))}
        </ul>

        <div className="relative border-t border-border p-3">
          <ul className="space-y-2">
            <li>
              <Link
                href="/help-support"
                className={`flex items-center rounded-md p-2 transition-colors hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 ${expanded ? '' : 'justify-center'}`}
              >
                <HelpCircle className="h-5 w-5 text-gray-500" />
                {expanded && (
                  <span className="ml-3 text-sm text-gray-500">
                    Help & Support
                  </span>
                )}
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className={`flex w-full items-center rounded-md p-2 transition-colors hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 ${expanded ? '' : 'justify-center'}`}
              >
                <LogOut className="h-5 w-5 text-gray-500" />
                {expanded && <span className="ml-3 text-gray-500">Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default AppSidebar;
