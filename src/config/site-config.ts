import { Metadata } from 'next';

export const siteConfig: Metadata = {
  title:
    'Take your development skills from 0 to 100 and join the 100xdevs community',
  description:
    'This is an initiative by Harkirat Singh to personally mentor folks in the field of Programming. Join him in his first course on Full Stack development with a heavy focus on Open source projects to learn programming practically.',
  icons: {
    icon: '/favicon.ico',
  },
  applicationName: '100xdevs',
  creator: 'Harkirat',
  twitter: {
    creator: '@kirat_tw',
    title:
      'Take your development skills from 0 to 100 and join the 100xdevs community',
    description:
      'This is an initiative by Harkirat Singh to personally mentor folks in the field of Programming. Join him in his first course on Full Stack development with a heavy focus on Open source projects to learn programming practically.',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://app.100xdevs/banner-img.jpeg',
        width: 1200,
        height: 630,
        alt: 'Take your development skills from 0 to 100 and join the prestigious 100xdevs community',
      },
    ],
  },
  openGraph: {
    title:
      'Take your development skills from 0 to 100 and join the prestigious 100xdevs community',
    description:
      'This is an initiative by Harkirat Singh to personally mentor folks in the field of Programming. Join him in his first course on Full Stack development with a heavy focus on Open source projects to learn programming practically.',
    siteName: '100xdevs',
    url: 'https://app.100xdevs.com',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://app.100xdevs/banner-img.jpeg',
        width: 1200,
        height: 630,
        alt: '100xdevs - Take your programming skills from 0 to 100 with Harkirat Singh',
      },
    ],
  },
  category: 'Technology',
  alternates: {
    canonical: 'https://app.100xdevs.com',
  },
  keywords: [
    'Javascript for begginers',
    'Learn from the expert',
    'MERN stack',
    '100xdevs',
    'Harkirat Cohort',
    'Devops',
    'Advanced Backend',
    'Javscript to typescript',
  ],
  metadataBase: new URL('https://app.100xdevs.com'),
};
