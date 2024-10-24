import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSubmissionByUser } from '@/db/submission';
import { getAssignments, getPurchases } from '@/utiles/appx';
import StudentAssignment from '@/components/assignments/StudentAssignment';

const AssignmentPage = async () => {
  const getCourses = async () => {
    const session = await getServerSession(authOptions);
    const purchases = await getPurchases(session?.user.email || '');
    const submissions = await getSubmissionByUser(session?.user?.id ?? '');
    const completedAssignments = submissions.map((submission: any) => ({
      ...submission.assignment,
      course: submission.course
    }));
    return {purchases, completedAssignments};
  };
  const {purchases, completedAssignments} = await getCourses();
  if (purchases.type === 'error') {
    throw new Error('Ratelimited by appx please try again later');
  }
  const courses = purchases?.courses;
  const courseIds = courses?.map(course => course.id);
  const assignments = await getAssignments(courseIds);
  return (
    <div>
      <StudentAssignment assignments={assignments} completedAssignments={completedAssignments} />
    </div>
  );
};

export default AssignmentPage;
