'use client'
import React, { ReactNode } from 'react'
import { Appbar } from '@/components/Appbar'
import MainSidebar from '@/components/MainSidebar'
import { mainSideBarToggle } from '@/store/atoms/mainSidebar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useSession } from 'next-auth/react'
// import Topbar from '@/components/Topbar'


export default function MainProvider({ children }: { children: ReactNode }) {
    const { data: session, status: sessionStatus } = useSession();
    const isLoading = sessionStatus === 'loading';

    const [isMainSideBarCompressed, setIsMainSideBarCompressed] = useRecoilState(mainSideBarToggle);
    return (
        <div>
            <div className='border-red-500 h-screen'>
                {/* <div className="min-h-[calc(100vh-64px)]">{children}</div> */}


                <div className='flex w-full h-full'>
                    {!isMainSideBarCompressed && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            onClick={() => setIsMainSideBarCompressed(true)}
                        ></div>
                    )}
                    {(session && session?.user && !isLoading) && <MainSidebar />}

                    <div className={`flex flex-col w-full ${isMainSideBarCompressed ? ` ${(session && session?.user && !isLoading) ? 'md:w-[calc(100vw-4rem)]':'w-full'}` : 'md:w-[calc(100vw-15rem)]'} `}>
                        {/* <Topbar /> */}
                        <Appbar />
                        <div className='!h-[calc(100vh-4rem)] w-full overflow-y-auto'>
                            {children}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
