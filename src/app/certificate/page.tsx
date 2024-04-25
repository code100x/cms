// pages/certificate.tsx
import React from 'react';
import CertificateComponent from '@/components/Certificate';

const defaultCourse = {
  // this is  jusst an example data to show the certificate
  id: '1',
  title: 'Full Stack Development',
  description:
    'This is an example certificate for completing the Full Stack Development course.',
  imageUrl: '/certiTemplate.png',
};

const CertificatePage: React.FC = () => {
  return (
    <div>
      <CertificateComponent course={defaultCourse} />
    </div>
  );
};

export default CertificatePage;
