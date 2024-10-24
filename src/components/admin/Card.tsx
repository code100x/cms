import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AdminCardProps {
  title?: string;
  count?: number | string;
  link: string;
  src: string | StaticImageData;
  footer: string;
}
const AdminCard = ({ title, count, link, src, footer }: AdminCardProps) => {
  return (
    <div className="flex w-full flex-col justify-between gap-y-2 rounded-xl p-4 bg-custom-light shadow-neumorphic dark:bg-custom-dark dark:shadow-neumorphic-dark transition-all duration-300">
      <div className='flex justify-between w-ful'>
        <p className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-xl font-semibold text-transparent">{title}</p>
        <Image
          src={src}
          width={40}
          height={40}
          alt=""
          className="rounded dark:bg-[#717D86] p-2 border border-black transition-transform duration-300 ease-in hover:scale-110"
        />
      </div>
      <div className="w-10 rounded-full p-3">
        <p className="text-xl text-gray-700 dark:text-gray-100">{count}</p>
      </div>
      <div className="flex items-center justify-between">
        <Link href={link}>
          <p className="text-xs text-[#657179] underline transition-colors duration-300 ease-in hover:text-blue-500">
            {footer}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminCard;

