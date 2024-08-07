import { CertificateComponent } from '@/components/Certificate';
import { getCertificates } from '@/db/cert';

const CertificatePage = async () => {
  const certificates = await getCertificates();

  return (
    <section className="flex w-full flex-wrap items-center justify-center">
      {certificates?.map(({ cert, course, user }) => (
        <CertificateComponent
          certificateId={cert.id}
          //@ts-ignore
          course={course}
          certificateSlug={cert.slug}
          userName={user.name!}
          key={course.id}
        />
      ))}
    </section>
  );
};

export default CertificatePage;
