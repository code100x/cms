import db from '@/db';

const YoutubeRenderer = async ({ content }: { content: { id: string } }) => {
  const video = await db.youtubeMetadata.findUnique({
    where: {
      contentId: parseInt(content.id, 10),
    },
  });

  if (!video?.id) {
    return <div>No video Available</div>;
  }

  return (
    <div>
      <iframe
        width="100%"
        className="h-[80vh]"
        height="500px"
        src={`https://www.youtube.com/embed/${video?.videoId}?rel=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeRenderer;
