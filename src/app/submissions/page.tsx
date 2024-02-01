import CreateSubmission from "@/components/CreateSubmission";
import { getUserSession } from "@/lib/auth";
import { getSubmissions } from "@/utiles/getSubmissions";
import Link from "next/link";
import React from "react";

type Props = {};

const SubmissionsPage = async (props: Props) => {
  const session = await getUserSession();
  const submissions = await getSubmissions(session.user.id || "");
  return (
    <div className="container mx-auto sm:flex sm:flex-row-reverse sm:justify-between">
      <CreateSubmission />
      {submissions.length === 0 ? (
        <p className="pt-4">You have not made any submissions</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {submissions.map((submission) => (
            <Link
              href={submission.submissionLink}
              key={submission.id}
              className="underline underline-offset-4 block p-4"
            >
              {submission.week}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionsPage;
