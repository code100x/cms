'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Image from 'next/image';
import GITHUB from "../../public/platform/github.svg";
import Link from 'next/link';
import { GitHubLink } from '@prisma/client';


export const GitHubLinkButton = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [githubData, setGithubData] = useState<GitHubLink | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('github_linked') === 'true') {
      router.push('/payout-methods')
      toast.success('Github account linked successfully')
    } else if (searchParams.get('error') === 'github_link_failed') {
      toast.error("Couldn't link with your github , Try again after sometime")
    }
  }, [searchParams]);

  const getGithubData = async () => {
    const response = await fetch('/api/github/details');
    const resp = await response.json()
    setGithubData(resp.data[0]);
  }


  const handleUnlinkAccount = async () => {
    setIsProcessing(true);
    const response = await fetch('/api/github/details', {
      method: 'DELETE'
    });
    setIsProcessing(false);
    const resp = await response.json()
    console.log(resp);
    if (resp.success) {
      toast.success(resp.message);
      getGithubData()
    }
    else {
      toast.error(resp.message);
    }
  }



  useEffect(() => {
    // fetch the saved github linked data 
    getGithubData()
  }, [searchParams])

  const handleLinkGitHub = async () => {
    setIsProcessing(true);
    window.location.href = '/api/github/link';
  };

  return (
    <>
      <div className="p-6 cursor-pointer border-2 relative rounded-lg group overflow-hidden flex flex-col justify-between h-[18rem]">
        <div>
          <div>
            <h3 className="text-lg font-semibold">Github</h3>
            <p className="text-sm text-muted-foreground">Link your Github account</p>
          </div>
        </div>

        <div className='flex items-center gap-2 my-6'>
          {githubData ? (
            <div className='flex items-center gap-2'>
              {/* {githubData?.avatarUrl} */}
              <Button onClick={handleUnlinkAccount} color='white' variant={'destructive'} className='w-[5rem] font-semi-bold h-[2rem] text-white'>
                {isProcessing ? 'Unlinking...' : 'Unlink'}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button color='white' variant={'outline'} className='w-fit font-semi-bold h-[2rem] text-white'>
                    <div className="w-full flex items-center gap-2 h-full">
                      <Image
                        src={githubData?.avatarUrl || ''}
                        alt="Landscape"
                        width={400}
                        height={400}
                        className="w-[1rem] h-[1rem] rounded-full object-cover"
                      />
                      <p className='dark:text-white text-black'>View more</p>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <div className="flex flex-col items-center gap-6 py-8">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={githubData?.avatarUrl || ''} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1 text-center">
                      <h3 className="text-2xl font-bold">@{githubData?.username}</h3>
                      <Link href={githubData?.profileUrl || ''} target='_blank' className="text-muted-foreground hover:underline cursor-pointer">{githubData?.profileUrl}</Link>
                      {/* <p className="text-sm text-muted-foreground">@oliviadavis</p> */}
                    </div>
                  </div>

                </DialogContent>
              </Dialog>

            </div>
          ) : (
            <Button onClick={handleLinkGitHub} disabled={isProcessing} color='white' className='w-[5rem] font-semi-bold h-[2rem] text-white'>
              {isProcessing ? 'Linking...' : 'Link'}
            </Button>
          )}
        </div>

        <div className="w-full h-full">
          <Image
            src={GITHUB}
            alt="Landscape"
            width={400}
            height={400}
            className="absolute dark:invert w-[10rem] h-[10rem] bottom-[-50px] opacity-40 group-hover:opacity-100 right-0 group-hover:bottom-[-20px] transition-all duration-300 ease-in-out object-cover"
          />
        </div>
      </div>
    </>
  );
};
