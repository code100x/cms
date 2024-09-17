import { SiGithub, SiNotion } from '@icons-pack/react-simple-icons';
import Link from 'next/link';
import React from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { ArrowUpRightFromSquare } from 'lucide-react';

const ExternalLinks = () => {
  const externalLinks = [
    {
      href: 'https://projects.100xdevs.com/',
      label: 'Slides',
      icon: <SiNotion className="h-5 w-5" />,
    },
    {
      href: 'https://github.com/100xDevs-hkirat/',
      label: 'Assignments C1',
      icon: <SiGithub className="h-5 w-5" />,
    },
    {
      href: 'https://github.com/100xdevs-cohort-2/',
      label: 'Assignments C2',
      icon: <SiGithub className="h-5 w-5" />,
    },
    {
      href: 'https://github.com/100xdevs-cohort-3/',
      label: 'Assignments C3 & Web3',
      icon: <SiGithub className="h-5 w-5" />,
    },
    {
      href: 'https://github.com/code100x/',
      label: 'Contribute to code100x',
      icon: <SiGithub className="h-5 w-5" />,
    },
  ];
  return externalLinks.map((link) => (
    <Link key={link.href} href={link.href} target="_blank">
      <DropdownMenuItem className="flex items-center justify-between text-base">
        <div className="flex items-center gap-2">
          {link.icon}
          <span>{link.label}</span>
        </div>
        <ArrowUpRightFromSquare className="size-4" />
      </DropdownMenuItem>
    </Link>
  ));
};

export default ExternalLinks;
