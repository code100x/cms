import axios from 'axios';

interface DiscordData {
  type: string;
  thumbnail: string;
  title: string;
  courseTitle: string;
  courseId: number;
  mediaId: number;
  currFolderId: number;
}

export default function DiscordService() {
  const sendUpdateToDiscord = async (data: DiscordData) => {
    const body = {
      content: 'Hello @everyone',
      tts: false,
      color: 'white',
      embeds: [
        {
          title: `New ${data?.type === 'notion' ? 'NOTE' : data?.type?.toUpperCase()}`,
          description: `${data?.title} has been added in the ${data?.courseTitle} , [Click here to visit this ${data?.type === 'notion' ? 'note' : data?.type}](https://app.100xdevs.com/courses/${data.courseId}/${data.currFolderId}/${data.mediaId})`,
        },
      ],
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL}`,
        body,
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    sendUpdateToDiscord,
  };
}
