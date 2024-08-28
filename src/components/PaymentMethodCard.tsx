import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ViewAllDialog } from './ViewAllDialog';

interface PayoutMethodCardProps {
    title: string;
    description: string;
    imageSrc: string;
    addresses: | Array<{
        id: number;
        value: string;
        userId: string;
    }>
    | undefined;
    onAdd: (method: string) => void;
    id: string;
    onDelete: (id: number) => void;
}

export const PayoutMethodCard: React.FC<PayoutMethodCardProps> = ({
    title,
    description,
    imageSrc,
    addresses,
    onAdd,
    id,
    onDelete
}) => {
    return (
        <div className="p-6 border-2 cursor-pointer relative rounded-lg group overflow-hidden flex flex-col justify-between h-[18rem]">
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <div className='flex items-center gap-2 my-6'>
                <Button onClick={(e: any) => onAdd(e.target.id)} color='white' id={id} className='w-[5rem] font-semi-bold h-[2rem] text-white'>
                    Add
                </Button>

                {addresses?.length !== 0 && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'outline'} className='w-[5rem] font-semi-bold h-[2rem] dark:text-white'>
                                View All
                            </Button>
                        </DialogTrigger>
                        <ViewAllDialog title={`Your ${title} Addresses`} addresses={addresses} onDelete={onDelete} />
                    </Dialog>
                )}
            </div>

            <div className="w-full h-full">
                <Image
                    src={imageSrc}
                    alt={title}
                    width={400}
                    height={400}
                    className="absolute w-[10rem] h-[10rem] bottom-[-50px] opacity-40 group-hover:opacity-100 right-[8px] group-hover:bottom-[-20px] transition-all duration-300 ease-in-out object-contain"
                />
            </div>
        </div>
    );
};