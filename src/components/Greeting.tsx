'use client';

import { useEffect, useState } from 'react';

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour >= 4 && currentHour < 12) return 'Good Morning';
  if (currentHour >= 12 && currentHour < 17) return 'Good Afternoon';
  if (currentHour >= 17 && currentHour <= 20) return 'Good Evening';
  return 'Happy to see you back!';
};

export const Greeting = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return greeting;
};
