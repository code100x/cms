'use client';
import { format, parseISO } from 'date-fns';
import ClassItem from './ClassItem';

const ClassList = ({ classes }: any) => {
  const groupedClasses = classes.reduce((acc: any, item: any) => {
    const date = format(parseISO(item.date), 'MMMM dd, yyyy');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {classes?.length > 0 ? (
        Object.entries(groupedClasses).map(([date, classes]: any) => (
          <div key={date} className="mt-4 py-2">
            <h4 className="p-2 text-xl font-bold dark:text-gray-200">{date}</h4>
            <div className="space-y-2">
              {classes.map((item: any) => (
                <div key={item.id}>
                  <ClassItem key={item.title} classData={item} />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="h-full w-full p-4 text-center text-8xl font-bold text-gray-300 dark:text-gray-600">
          <p className="mb-4">No classes</p>
          <p>scheduled</p>
        </div>
      )}
    </div>
  );
};

export default ClassList;
