'use client';

import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { motion } from 'framer-motion';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Sidebar } from './Sidebar';

interface SidebarProviderProps {
  children: React.ReactNode;
  fullCourseContent: any;
  courseId: string;
}

export default function SidebarProvider({
  children,
  fullCourseContent,
  courseId,
}: SidebarProviderProps) {
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);

  return (
    <div>
      <Sidebar fullCourseContent={fullCourseContent} courseId={courseId} />
      <motion.div
        className="flex-1 transition-all duration-300"
        initial={{ marginRight: 0 }}
        animate={{ marginRight: sidebarOpen ? '30vw' : '0' }}
      >
        {children}
      </motion.div>
    </div>
  );
}
