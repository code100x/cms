"use client";
 
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const submissionTableColumns: ColumnDef<any>[] = [
    {
      accessorKey: "user",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0"
          >
            User
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const { user } = row.original;
        const userName = user?.name;
        return <div className="text-left font-medium">{userName}</div>;
      },
    },
    {
      accessorKey: "course",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0"
          >
            Course
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const { course } = row.original;
        const courseName = course?.title;
        return <div className="text-left font-medium">{courseName}</div>;
      },
    },
    {
      accessorKey: "submittedDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0"
          >
            Submitted date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const { submittedAt } = row.original;
        const time = format(new Date(submittedAt), 'MMM dd yyyy');
        return <div className="text-left font-medium">{time}</div>;
      },
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.submittedAt);
        const dateB = new Date(rowB.original.submittedAt);
        return dateA.getDate() - dateB.getDate();
      }
    },
    {
      accessorKey: "submittedTime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0"
          >
            Submitted time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const { submittedAt } = row.original;
        const time = format(new Date(submittedAt), 'hh:mm a');
        return <div className="text-left font-medium">{time}</div>;
      },
      sortingFn: (rowA, rowB) => {
        const dateA = new Date(rowA.original.submittedAt);
        const dateB = new Date(rowB.original.submittedAt);
        return dateA.getTime() - dateB.getTime();
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const {id} = row.original;
        const router = useRouter();
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push(`/admin/submission/${id}`)}>
                View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
];

