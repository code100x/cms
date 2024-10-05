'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CheckIcon, Search, Tags } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; 
import { getUpdatedUrl } from '@/lib/utils';
import { Button } from './ui/button';
import { ExtendedQuestion } from '@/actions/question/types';
import Tag from './posts/tag';

export default function LabelDropdown({posts}:{posts:ExtendedQuestion[] | null}) {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [labels,setLabels] = useState<string[]>([]); 
  const searchParams = useSearchParams();
  const router = useRouter(); 
 
  useEffect(() => {
    const taggedPosts:ExtendedQuestion[]=[];
    const filterPosts = () => {
      if (posts!=null) {
        posts.filter(post => {
          if (post.tags.length!=0)  taggedPosts.push(post);
});
      }
    }; 
    filterPosts();

    const newLabels:string[]=[];
    taggedPosts.map(post => { 
      const tags = post.tags;
      tags.map(tag => {
        tag= tag.trim();
        const checkTag = tag === tag.toUpperCase() ? tag : tag[0].toUpperCase() + tag.slice(1);
        if (!newLabels.includes(checkTag) && checkTag.length!=0) {
          newLabels.push(checkTag);
        }
      });
    });

    setLabels(newLabels.sort());
  },[posts]);
  
  const handleToggleLabel = (id: string) => {
    setSelectedLabels((prev) =>
      prev.includes(id) ? prev.filter((label) => label !== id) : [...prev, id]
    );
  };

  const filteredLabels = labels.filter((label) =>
    label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updatedUrl = getUpdatedUrl('/question', Object.fromEntries(searchParams.entries()), {
    tags: selectedLabels.join(','), 
  });

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <Button size={"lg"} onClick={() => setIsOpen(true)}>
            <Tags className='mr-1.5 h-[18px] w-[18px]'/>
            Labels
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="w-60 p-2 bg-slate-950 shadow-lg rounded-md overflow-auto max-h-60">
          <div className='flex  p-1 w-full border rounded bg-slate-900 mb-1'>
            <input
              type="text"
              className="w-full h-9 text-sm border rounded-md pl-2"
              placeholder="Filter labels"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className='ml-3 h-8'
              onClick={() => {
                setIsOpen(false); 
                router.push(updatedUrl); 
              }}
              size={"sm"}
            >
              <Search size={20}/>
            </Button>
          </div>

          {filteredLabels.length > 0 ? (
            <div className="space-y-1">
              {filteredLabels.map((label,index) => (
                <DropdownMenu.Item
                  key={`${label}-${index}`}
                  className="flex items-center justify-between px-2 py-1 text-sm cursor-pointer hover:bg-slate-600 rounded-md"
                  onSelect={(e) => {
                    e.preventDefault(); 
                    handleToggleLabel(label); 
                  }}
                > 
                  <Label name={label}/>
                 
                  {selectedLabels.includes(label) && (
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  )}
                </DropdownMenu.Item>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">No labels found</div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const Label = ({name}:{name:string}) => {
  return (
    <>
      { name!=="" &&
        <Tag name={name}/>
      }
    </>
  );
};