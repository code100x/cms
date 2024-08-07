import { render, screen } from '@testing-library/react';
import SigninPage from '@/app/signin/page';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { vi } from 'vitest';

// Mock getServerSession
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

// Mock redirect
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
  useRouter: vi.fn(),
}));

describe('SigninPage', () => {
  it('redirects to the homepage if the user is authenticated', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce({
      user: { name: 'Test User' },
    });

    // Render the component
    render(await SigninPage());

    // Check if redirect was called
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('renders the Signin component if the user is not authenticated', async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(null);

    // Render the component
    render(await SigninPage());

    // Check if Signin component is rendered
    expect(screen.getByText('Signin to your Account')).toBeInTheDocument();
  });
});
