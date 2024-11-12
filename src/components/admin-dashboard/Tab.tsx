'use client';
import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Tab: React.FC<TabProps> = ({
  tabs,
  activeTab,
  onTabChange,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="my-4 flex justify-between space-x-4">
      <div>
        {tabs.map((tab, i) => (
          <button
            key={`${i}-${tab}`}
            className={`px-4 py-2 ${activeTab === tab ? 'border-b border-blue-700 text-black dark:text-white' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="relative rounded-full bg-gray-200 shadow-inner shadow-gray-300 dark:rounded-full">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-transparent px-4 py-2 text-black outline-none dark:bg-gray-700 dark:text-white"
          />
          <button className="absolute right-0 top-0 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <Search
                size={20}
                className={cn('text-blue-700', 'flex items-center')}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tab;
