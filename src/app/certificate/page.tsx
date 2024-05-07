import { CertificateComponent } from '@/components/Certificate';
import { getCertificates } from '@/db/cert';

const CertificatePage = async () => {
  const certificates = await getCertificates();

  return (
    <section className="flex flex-wrap justify-center items-center w-full">
      {certificates?.map(({ cert, course }) => (
        <CertificateComponent
          certificateId={cert.id}
          course={course}
          key={course.id}
        />
      ))}
    </section>
  );
};

export default CertificatePage;
