'use client';

export const Greeting = () => {
  // Get the current hour
  const currentHour = new Date().getHours();

  // Determine the appropriate greeting based on the time of day
  let greeting = 'Good Morning';
  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon';
  } else if (currentHour >= 18 || currentHour < 5) {
    greeting = 'Good Evening';
  } else {
    greeting = 'Surprise to see you here!';
  }

  return greeting;
};
