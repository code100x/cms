/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import CertificateComponent from '@/components/Certificate';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const CertificatePage = () => {
  const { data: session, status } = useSession();
  const userName = session?.user?.name || 'test';
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // For testing purposes, we'll use a default course data
        const defaultCourseData = {
          id: '1',
          title: 'Full Stack Development Course (0 TO 1)',
          imageUrl: '/certiTemplate.png',
          date: new Date(),
        };
        setCourse(defaultCourseData);
        // const response = await fetch(`/api/courses/${courseId}`);
        // const data = await response.json();
        // setCourse(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, []);

  const handleDownloadCertificate = useCallback(async () => {
    const element = document.getElementById('certificateArea');
    if (element) {
      document.getElementById('certificateText').style.visibility = 'visible';
      const canvas = await html2canvas(element);
      const image = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = image;
      a.download = `${course.title} Certificate.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      document.getElementById('certificateText').style.visibility = 'hidden';
    }
  }, [course]);

  const handleShareLinkedIn = () => {
    const certificateUrl = `${window.location.origin}/certificate/${course.id}`;
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      certificateUrl,
    )}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleShareTwitter = () => {
    const tweetText = `I just earned the "${course.title}" certificate on 100x Academy! Check it out:`;
    const certificateUrl = `${window.location.origin}/certificate/${course.id}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText,
    )}&url=${encodeURIComponent(certificateUrl)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (status === 'loading' || !course) {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <>
      <div>
        <CertificateComponent course={course} userName={userName} />
      </div>
      <div className="p-4 flex justify-center space-x-4">
        <button
          onClick={handleDownloadCertificate}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Download Image
        </button>
        <button
          onClick={handleShareLinkedIn}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Share on LinkedIn
        </button>
        <button
          onClick={handleShareTwitter}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700"
        >
          Share on Twitter
        </button>
      </div>
    </>
  );
};

export default CertificatePage;
