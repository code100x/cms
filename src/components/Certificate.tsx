'use client';
import React from 'react';

interface PurchaseType {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

interface CertificateComponentProps {
  course: PurchaseType;
}

const CertificateComponent: React.FC<CertificateComponentProps> = ({
  course,
}) => {
  const handleDownloadCertificate = async () => {
    try {
      const response = await fetch(`/api/certificate/${course.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${course.title} Certificate.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Error downloading certificate');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleShareLinkedIn = () => {
    const certificateUrl = `${window.location.origin}/api/certificate/${course.id}`;
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(certificateUrl)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleShareTwitter = () => {
    const certificateUrl = `${window.location.origin}/api/certificate/${course.id}`;
    const text = `Check out my certificate for ${course.title} from 100xdevs!`;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(certificateUrl)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div
      className="card"
      style={{
        width: '60%',
        margin: '20px auto',
        padding: '10px',
        border: '1px solid #ccc',
        boxShadow: '2px 2px 10px #eee',
      }}
    >
      <div
        className="card-content"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {}
        <img
          src="/certiTemplate.png"
          alt="Certificate template"
          width="400"
          height="400"
        />
      </div>
      <div className="card-header">
        <h3 className="card-title">{course.title}</h3>
        <p className="card-description">{course.description}</p>
      </div>
      <div
        className="card-footer"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <button
          onClick={handleDownloadCertificate}
          style={{ padding: '5px 20px', cursor: 'pointer' }}
        >
          Download Image
        </button>
        <button
          onClick={handleShareLinkedIn}
          style={{ padding: '5px 20px', cursor: 'pointer' }}
        >
          Share on LinkedIn
        </button>
        <button
          onClick={handleShareTwitter}
          style={{ padding: '5px 20px', cursor: 'pointer' }}
        >
          Share on Twitter
        </button>
      </div>
    </div>
  );
};

export default CertificateComponent;
