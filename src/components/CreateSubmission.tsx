"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { handleAssignmentSubmission } from "@/app/actions/handleAssignmentSubmission";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

const CreateSubmission = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [link, setLink] = useState("");
  const [week, setWeek] = useState("");
  const handleSubmit = async () => {
    if (link.length === 0 || week.length === 0) {
      return toast({
        title: "Should not be empty",
      });
    }
    const response = await handleAssignmentSubmission(link, week);
    toast({
      title: response.message,
    });
    router.refresh();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-32 sm:float-right">
          Add Submission
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Submission Link</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              id="link"
              placeholder="Github URL..."
              className="col-span-3"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="week" className="text-right">
              Week
            </Label>
            <Input
              id="week"
              placeholder="ENTER WEEK NAME..."
              className="col-span-3"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              max={25}
              maxLength={25}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create Submission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubmission;
