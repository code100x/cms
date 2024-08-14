import https from 'https';
import fs, { existsSync, mkdirSync } from 'fs';
import { RootDir } from '../../root-dir.mjs';
import {
  getMetadata,
  isUrlAccessible,
} from '@/components/admin/ContentRenderer';
import ffmpeg from 'fluent-ffmpeg';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const downloadVideo = (url: string, fileName: string) => {
  const temp = `${RootDir}/temp`;
  const createDirIfNotExists = (temp: string) =>
    !existsSync(temp) ? mkdirSync(temp) : undefined;
  createDirIfNotExists(temp);

  const destination = `${temp}/${fileName}`;
  https.get(url, (resp) => resp.pipe(fs.createWriteStream(destination)));

  return destination;
};

export const getVideoUrl = async (contentId: number): Promise<any> => {
  const metadata = await getMetadata(contentId);

  if (!metadata) {
    return null;
  }

  if (await isUrlAccessible(metadata?.[360])) {
    return metadata?.[360];
  } else if (await isUrlAccessible(metadata?.[720])) {
    return metadata?.[720];
  }

  return metadata?.[1080];
};

async function convertToSRT(destination: string) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(destination),
    model: 'whisper-1',
  });

  return transcription.text;
}

export const convertVideoToMP3 = async (contentId: number) => {
  const url = await getVideoUrl(contentId);

  if (!url) {
    return;
  }

  const downloadedVideo = downloadVideo(url, `example.mp4`);

  ffmpeg(downloadedVideo)
    .output(`${RootDir}/temp/audio.mp3`)
    .on('end', async () => {
      console.log('Conversion finished');
      await convertToSRT(`${RootDir}/temp/audio.mp3`);
    })
    .on('error', (err) => console.error('Error:', err))
    .run();
};
