'use client';

export const Greeting = () => {
  // Get the current hour
  const currentHour = new Date().getHours();

  // Determine the appropriate greeting based on the time of day
  let greeting;
  if (currentHour >= 4 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour <= 20) {
    greeting = 'Good Evening';
  } else {
    greeting = 'Surprise to see you here!';
  }

  return greeting;
};
