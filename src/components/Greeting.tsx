'use client';

export const Greeting = ({ name }: { name: string }) => {
  // Get the current hour
  const currentHour = new Date().getHours();
  // Determine the appropriate greeting based on the time of day
  let greeting;
  if (currentHour >= 4 && currentHour < 12) {
    greeting = `Good Morning ${name}`;
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = `Good Afternoon ${name}`;
  } else if (currentHour >= 17 && currentHour <= 20) {
    greeting = `Good Evening ${name}`;
  } else {
    greeting = 'Happy to see you back!';
  }

  return greeting;
};
