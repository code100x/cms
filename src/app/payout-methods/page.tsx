"use client"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NewPayoutDialog from "@/components/NewPayoutDialog";
import { Trash } from "lucide-react";
import { deleteSolanaAddress, deleteUpiId, getPayoutMethods } from "@/actions/payoutMethods";
import { SolanaAddress, UpiId } from "@prisma/client";
import { useAction } from "@/hooks/useAction";
import { toast } from "sonner";

export default function Page() {

    const [isDialogBoxOpen, setIsDialogBoxOpen] = useState<boolean>(false);
    const [btnClicked, setBtnClicked] = useState<string>("");

    const openDialog = (e: any) => {
        setIsDialogBoxOpen(true);
        setBtnClicked(e.target.id);
    }

    const closeDialog = () => setIsDialogBoxOpen(false);

    const [upiAddresses, setUpiAddresses] = useState<UpiId[] | undefined>([])
    const [solanaAddresses, setSolanaAddresses] = useState<SolanaAddress[] | undefined>([])

    const fetchPayoutMethods = async () => {
        const result = await getPayoutMethods()
        if (result) {
            setUpiAddresses(result.upiIds)
            setSolanaAddresses(result.solanaAddresses)
        }
    }

    const { execute: executeDeleteUPI } = useAction(deleteUpiId, {
        onSuccess: () => {
            toast.success("UPI Address deleted successfully")
        },
        onError: () => {
            toast.error("Failed to delete UPI id")
        }
    })

    const { execute: executeDeleteSolana } = useAction(deleteSolanaAddress, {
        onSuccess: () => {
            toast.success("Solana Address deleted successfully")
        },
        onError: () => {
            toast.error("Failed to delete Solana address")
        }
    })

    const handleUpiDelete = (id: number) => {
        executeDeleteUPI({ id: id })
        fetchPayoutMethods()
    }

    const handleSolanaDelete = (id: number) => {
        executeDeleteSolana({ id: id })
        fetchPayoutMethods()
    }

    useEffect(() => {
        fetchPayoutMethods()
    }, [])

    useEffect(() => {
        fetchPayoutMethods()
    }, [isDialogBoxOpen])

    return (
        <div className="h-max pb-4 transition-colors duration-500 md:p-8">
            <div className="mb-6 flex flex-col items-start justify-center sm:px-8 px-4 pt-3">
                <div className="text-3xl text-black transition-colors duration-500 dark:text-white">
                    <h1 className="text-black dark:text-white">Payout Methods</h1>
                </div>
                <div className="py-8 sm:px-0 px-2">
                    <div>
                        <div className="w-[90vw] flex justify-between">
                            <p className="font-semibold py-2">UPI Addresses</p>
                            <Button
                                id="UPI"
                                size="sm"
                                className="light:text-black sticky rounded-md bg-black hover:bg-[#242424] p-3 text-white transition-colors duration-500 dark:bg-white dark:text-black hover:dark:bg-white"
                                onClick={(e) => openDialog(e)}
                            >
                                Add UPI address
                            </Button>
                            <NewPayoutDialog onClose={closeDialog} isOpen={isDialogBoxOpen} title={btnClicked} />
                        </div>
                        <div className="flex flex-col sm:w-3/6 w-[90vw]">
                            {
                                upiAddresses?.length !== 0 ? (
                                    upiAddresses?.map((upi, index) => (
                                        <div key={index} className="w-full flex items-center justify-between py-2">
                                            <p className="sm:w-full w-1/2 overflow-hidden text-ellipsis whitespace-nowrap" >{upi.value}</p>
                                            <Button className="mx-3" size="iconSM" variant={"outline"}><Trash className="w-4 h-4" onClick={() => handleUpiDelete(upi.id)} /></Button>
                                        </div>
                                    ))
                                ) :
                                    <div className="flex flex-col items-start">
                                        <p className="py-3">No addresses added yet!</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="py-4 sm:px-0 px-2">
                    <div>
                        <div className="w-[90vw] flex justify-between">
                            <p className="font-semibold py-2">Solana Addresses</p>
                            <Button
                                id="Solana"
                                size="sm"
                                className="light:text-black sticky rounded-md bg-black hover:bg-[#242424] p-3 text-white transition-colors duration-500 dark:bg-white dark:text-black hover:dark:bg-white"
                                onClick={(e) => openDialog(e)}
                            >
                                Add SOL address
                            </Button>
                        </div>
                        <div className="flex flex-col sm:w-3/6 w-[90vw]">
                            {
                                solanaAddresses?.length !== 0 ? (
                                    solanaAddresses?.map((sol, index) => (
                                        <div key={index} className="flex items-center justify-between py-2">
                                            <p className="sm:w-full w-1/2 overflow-hidden text-ellipsis whitespace-nowrap" >{sol.value}</p>
                                            <Button className="mx-3" size="iconSM" variant={"outline"}><Trash className="w-4 h-4" onClick={() => handleSolanaDelete(sol.id)} /></Button>
                                        </div>
                                    ))
                                ) :
                                    <div className="flex flex-col items-start">
                                        <p className="py-3">No addresses added yet!</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}