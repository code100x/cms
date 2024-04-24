// 'use client';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import { CertificateComponent } from '@/components/Certificate';

interface PurchaseType {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  appxCourseId: number;
  openToEveryone: boolean;
  slug: string;
  discordRoleId: string;
  totalVideos?: number;
  totalVideosWatched: number;
}

const CertificatePage = async () => {
  const session = await getServerSession(authOptions);
  const purchases: PurchaseType[] = await getPurchases(session);

  return (
    <div>
      <section className="flex flex-col items-center w-full">
        <div className="max-w-screen-xl w-full mx-auto py-6 px-6 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2">
          {purchases?.map((course) => (
            <CertificateComponent course={course} key={course.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CertificatePage;
