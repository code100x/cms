export function formatTime(currentTime: number) {
  // Convert seconds to integer for minutes and seconds calculations
  const time = Math.floor(currentTime);

  // Calculate minutes and seconds from the total time
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Add leading zeros for single-digit values
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Return the formatted time string
  return `${formattedMinutes}:${formattedSeconds}`;
}
