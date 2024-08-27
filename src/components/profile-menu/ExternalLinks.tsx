import { SiGithub, SiNotion } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import React from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { ArrowUpRightFromSquare } from 'lucide-react';

const ExternalLinks = () => {
  const externalLinks = [
    {
      href: 'https://github.com/100xdevs-cohort-3/assignments',
      label: 'Assignments',
      icon: <SiGithub className="h-4 w-4" />,
    },
    {
      href: 'https://projects.100xdevs.com/',
      label: 'Slides',
      icon: <SiNotion className="h-4 w-4" />,
    },
  ];
  return externalLinks.map((link) => (
    <Link key={link.href} href={link.href} target="_blank">
      <DropdownMenuItem className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {link.icon}
          <span>{link.label}</span>
        </div>
        <ArrowUpRightFromSquare className="h-3 w-3" />
      </DropdownMenuItem>
    </Link>
  ));
};

export default ExternalLinks;
