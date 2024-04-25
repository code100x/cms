import React from 'react';
import crypto from 'crypto';

interface CourseData {
  id: string;
  title: string;
  imageUrl: string;
  date: Date;
}

const CertificateComponent = ({
  course,
  userName,
}: {
  course: CourseData;
  userName: string;
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const currentDate = course.date
    ? formatDate(course.date)
    : formatDate(new Date());

  // Generate a unique ID for the student
  const uniqueId =
    `${crypto.randomBytes(8).toString('hex')  }-${  userName.replace(/\s/g, '')}`;

  return (
    <div className="card mx-auto w-3/5 border border-gray-300 shadow-lg mt-12 mb-6 relative">
      <div id="certificateArea" className="relative p-6">
        <img
          src={course.imageUrl || '/defaultCertificate.png'}
          alt="Certificate template"
          className="w-full h-auto"
        />
        <div
          id="certificateText"
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center text-black"
        >
          <h2 className="text-2xl font-bold">{userName}</h2>
          <p className="text-lg font-bold">
            Certificate ID: {uniqueId.toString().toUpperCase()}
          </p>
          <p className="absolute -bottom-11 w-full text-center text-base">
            Verified at: 100x@gmail.com
          </p>
          <h3 className="text-xl font-bold">{course.title}</h3>
          {/* <img src="/sign.png" alt="Signature" className="mx-auto h-16 mb-5 mr-24" /> */}
          <p className="text-base mt-36">Date of Issue: {currentDate}</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateComponent;
