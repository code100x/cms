import { useRouter } from 'next/navigation';
import AssignmentItem from './AssignmentItem';
import { formatDate } from '@/utiles/date';

const AssignmentList = ({ assignments }: any) => {
  const router = useRouter();
  const groupedAssignments = assignments.reduce((acc: any, assignment: any) => {
    const { date } = formatDate(assignment.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(assignment);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {Object.entries(groupedAssignments).map(([date, assignments]: any) => (
        <div key={date} className="mt-4 py-2">
          <h4 className="p-2 text-xl font-bold dark:text-gray-200">{date}</h4>
          <div className="space-y-2">
            {assignments.map((assignment: any) => (
              <div
                key={assignment.id}
                onClick={() => router.push(`/assignment/${assignment.id}`)}
                className="cursor-pointer"
              >
                <AssignmentItem
                  key={assignment.title}
                  assignment={assignment}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;
