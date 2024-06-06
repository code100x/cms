import { render, screen } from '@testing-library/react';
import VerifyPage from './page';
import { describe, expect, it, vi } from 'vitest';
import db from '@repo/db/mocks';

vi.mock('@/db');

describe('VerifyPage', () => {
  const mockCertificate = {
    id: '1',
    slug: 'valid-certificate',
    userId: 'user1',
    courseId: 1,
    user: {
      id: 'user1',
      name: 'John Doe',
    },
    course: {
      id: 1,
      title: 'React Course',
    },
  };

  it('renders the CertificateVerify component when the certificate is found', async () => {
    db.certificate.findFirst.mockResolvedValueOnce(mockCertificate);

    const { params } = { params: { id: 'valid-certificate' } };
    render(await VerifyPage({ params }));

    expect(
      screen.getByText(
        'This Certificate was issued to John Doe for completing React Course',
      ),
    ).toBeInTheDocument();
  });

  it('renders "Not Found" when the certificate is not found', async () => {
    db.certificate.findFirst.mockResolvedValueOnce(null);

    const { params } = { params: { id: 'invalid-certificate' } };
    render(await VerifyPage({ params }));

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
