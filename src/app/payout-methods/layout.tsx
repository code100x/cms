import { Suspense } from 'react';

export default function Layout({ children }: any) {
  return <Suspense>{children}</Suspense>;
}
