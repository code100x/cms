import React from 'react';
import { BookOpenCheck, PlusCircle } from 'lucide-react';
import AdminCard from '@/components/admin/Card';
import Link from 'next/link';
import enrolled from '@public/admin-card/reading.png';
import graduated from '@public/admin-card/graduation.png';
import active from '@public/admin-card/active-users.png';
import instructor from '@public/admin-card/teacher.png';
import {
  getActiveUsersBasedOnWatchHistory,
  getEnrolledStudents,
  getGraduatedStudents,
} from '@/utiles/user-metrics';
import { getAllCourses } from '@/db/course';
import { CourseTable } from '@/components/table/CourseTable';
import { courseTableColumns } from '@/components/table/CourseTableColumns';
import { Button } from '@/components/ui/button';

const AdminPage = async () => {
  const courses = await getAllCourses();
  const data = courses?.map((course: any) => {
    return {
      id: course?.id,
      title: course?.title,
    };
  });
  const enrolledStudentsCount = await getEnrolledStudents();
  const graduatedStudentsCount = await getGraduatedStudents();
  const activeStudentsCount = await getActiveUsersBasedOnWatchHistory();

  const CardItems = [
    {
      id: '1',
      title: 'ENROLLED',
      count: enrolledStudentsCount,
      link: '',
      src: enrolled,
      footer: 'See all users',
    },
    {
      id: '2',
      title: 'GRADUATED',
      count: graduatedStudentsCount,
      link: '',
      src: graduated,
      footer: 'See all users',
    },
    {
      id: '3',
      title: 'ACTIVE',
      count: activeStudentsCount,
      link: '',
      src: active,
      footer: 'See all users',
    },
    {
      id: '4',
      title: 'ADMIN',
      count: 1,
      link: '',
      src: instructor,
      footer: 'See all admins',
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4" >
        {CardItems.map((item) => (
          <div className="shadow-md transition-transform duration-300 ease-in hover:shadow-lg dark:hover:shadow-xl">
            <AdminCard
              key={item.id}
              title={item.title}
              count={item.count}
              link={item.link}
              src={item.src}
              footer={item.footer}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between px-6 mt-8">
        <div className="flex items-center justify-center">
          <BookOpenCheck size={32} className='mr-2 text-blue-500' />
          <p className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-semibold text-transparent">
            COURSES
          </p>
        </div>
        <Link href="/admin/course/add-course">
          {' '}
          <Button className='bg-gradient-to-b from-blue-400 to-blue-700'>
            {' '}
            <PlusCircle className="mr-2 h-4 w-4 text-white" />
            <p className='text-white'>New course</p>
          </Button>{' '}
        </Link>
      </div>
      <div className="rounded-lg p-6">
        <CourseTable columns={courseTableColumns} data={data} />
      </div>
    </div>
  );
};

export default AdminPage;
