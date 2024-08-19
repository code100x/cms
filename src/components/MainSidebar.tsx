'use client';
import React, { useEffect, useState } from 'react';
import Logo from './landing/logo/logo';
import { Bookmark, Files, FileStack, HelpCircle, History, LogOut, MessageSquare, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import Link from 'next/link';
// import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { mainSideBarToggle } from '@/store/atoms/mainSidebar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface ActiveItem {
    general: number | null;
    others: number | null;
}

export default function MainSidebar() {
    const pathName = usePathname();
    const [activeItems, setActiveItems] = useState<ActiveItem>({
        general: null,
        others: null
    });
    const router = useRouter();
    const session = useSession();
    const user = session?.data?.user;

    const [isMainSideBarCompressed, setIsMainSideBarCompressed] = useRecoilState(mainSideBarToggle);

    const isMyCoursesPath = (path: string) => {
        return path === '/' || path.startsWith('/courses/');
    };

    useEffect(() => {
        const currentPathName = pathName;
        let newGeneralActive: number | null = null;
        if (isMyCoursesPath(currentPathName)) {
            // Set "My Courses" as active
            newGeneralActive = 0; // Assuming "My Courses" is the first item in general options
        } else {
            newGeneralActive = sideBarOptions.general.findIndex((option) => option.href === currentPathName);
        }
        const newOthersActive = sideBarOptions.others.findIndex((option) => option.href === currentPathName);

        setActiveItems({
            general: newGeneralActive !== -1 ? newGeneralActive : null,
            others: newOthersActive !== -1 ? newOthersActive : null
        });
    }, [pathName]);

    const sideBarOptions = {
        general: [
            {
                name: 'My Courses',
                icon: Files,
                href: "/",
            },
            {
                name: 'Resourses',
                icon: FileStack,
                href: "/resources",
            },
            {
                name: 'Bookmarks',
                icon: Bookmark,
                href: "/bookmarks",
            },
            {
                name: 'Questions',
                icon: MessageSquare,
                href: "/questions",
            },
            {
                name: 'Watch History',
                icon: History,
                href: "/history",
            },
        ],
        others: [
            {
                name: 'Help and Support',
                icon: HelpCircle,
                href: "/help-and-support",
            },
            {
                name: 'Logout',
                icon: LogOut,
                href: "/logout",
            },
        ]
    }

    const ToggleIcon = isMainSideBarCompressed ? PanelLeftOpen : PanelRightOpen;

    return (
        <div className={`absolute z-[500] bg-[#fff] dark:bg-[#020817] md:static flex ${isMainSideBarCompressed ? '-translate-x-full md:translate-x-0 w-[70%] md:w-[4rem]' : 'translate-x-0 flex w-[15rem]'} transition-all duration-300 ease-in-out flex flex-col h-full border-r max-w-[15rem]`}>
            <div className={`h-16 px-4 border-b flex items-center ${isMainSideBarCompressed ? 'justify-center' : 'justify-between'}`}>
                {!isMainSideBarCompressed && <Logo textVisibilty={true} onFooter={false} />}
                <ToggleIcon className='cursor-pointer' onClick={() => setIsMainSideBarCompressed(prev => !prev)} size={18} />
            </div>

            <div className='flex flex-col w-full mt-4 flex-1 h-fit border-green-500'>
                <div className='flex font-semibold justify-between flex-1 flex-col'>
                    <div className='flex gap-4 h-fit  px-2  flex-col'>

                        {
                            sideBarOptions.general.map((x, idx) => {
                                return (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Link href={`${x.href}`} key={idx}>
                                                    <div className={`flex items-center transition-all duration-300 ease-in-out ${isMainSideBarCompressed ? 'justify-center' : ''} text-sm cursor-pointer ${activeItems.general === idx ? 'bg-[#F1F5F9] dark:bg-slate-800' : 'hover:bg-[#F1F5F9] dark:hover:bg-slate-800'} rounded-md px-3 py-3 h-fit gap-2`}>
                                                        <x.icon size={18} />
                                                        {!isMainSideBarCompressed && <p className={`transition-all duration-300 ease-in-out
        ${isMainSideBarCompressed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{x.name}</p>}
                                                    </div>
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent className={`${isMainSideBarCompressed ? 'block' : 'hidden'}`}>
                                                {x.name}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )
                            }
                            )
                        }
                    </div>


                    <div className='border-t py-[1rem] h-fit'>
                        <div className='flex flex-col gap-3 px-2 '>
                            {sideBarOptions.others.map((x, idx) => {
                                if (x.name === 'Logout') {
                                    return (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <div onClick={async () => await signOut()} className={`flex items-center transition-all duration-300 ease-in-out ${isMainSideBarCompressed ? 'justify-center' : ''} bg-[#DC26261A] text-[#DD503F]  text-sm cursor-pointer  rounded-md px-3 py-3 h-fit gap-2`}>
                                                        <x.icon size={18} />
                                                        {!isMainSideBarCompressed && <p className={`transition-all duration-300 ease-in-out
${isMainSideBarCompressed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{x.name}</p>}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent className={`${isMainSideBarCompressed ? 'block' : 'hidden'}`}>
                                                    {x.name}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )
                                }
                                return (
                                    <>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Link href={`${x.href}`} key={idx}>
                                                        <div className={`flex items-center transition-all duration-300 ease-in-out ${isMainSideBarCompressed ? 'justify-center' : ''} text-sm cursor-pointer ${activeItems.others === idx ? 'bg-[#F1F5F9] dark:bg-slate-800' : 'hover:bg-[#F1F5F9] dark:hover:bg-slate-800'} rounded-md px-3 py-3 h-fit gap-2`}>
                                                            <x.icon size={18} />
                                                            {!isMainSideBarCompressed && <p className={`transition-all duration-300 ease-in-out
        ${isMainSideBarCompressed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{x.name}</p>}
                                                        </div>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent className={`${isMainSideBarCompressed ? 'block' : 'hidden'}`}>
                                                    {x.name}
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </>
                                )
                            })}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
