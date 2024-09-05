export const updateWatchLaterOrder = async (reorderedContentIds: number[]) => {
  try {
    const response = await fetch('/api/watch-later', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reorderedContentIds }),
    });

    if (!response.ok) {
      throw new Error('Failed to update the Watch Later order');
    }

    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error('Error updating Watch Later order:', error);
  }
};
