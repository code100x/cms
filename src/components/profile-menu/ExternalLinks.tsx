import { SiGithub, SiNotion } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import React from 'react';
import { ArrowUpRightFromSquare } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

export default function ExternalLinks() {
  const assignmentLinks = [
    {
      href: 'https://github.com/100xdevs-cohort-2/assignments',
      label: 'Cohort 2',
    },
    {
      href: 'https://github.com/100xdevs-cohort-3/assignments',
      label: 'Cohort 3',
    },
  ];

  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <SiGithub className="h-4 w-4" />
            <span>Assignments</span>
          </div>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-neutral-100 dark:bg-neutral-900">
          {assignmentLinks.map((link) => (
            <Link key={link.href} href={link.href} target="_blank">
              <DropdownMenuItem className="flex items-center justify-between text-base">
                <span>{link.label}</span>
                <ArrowUpRightFromSquare className="h-4 w-4" />
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>

      <Link href="https://projects.100xdevs.com/" target="_blank">
        <DropdownMenuItem className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <SiNotion className="h-4 w-4" />
            <span>Slides</span>
          </div>
          <ArrowUpRightFromSquare className="h-4 w-4" />
        </DropdownMenuItem>
      </Link>
    </>
  );
}
