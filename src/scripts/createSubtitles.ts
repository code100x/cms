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

const downloadVideo = (url: string, fileName: string) => {
  const temp = `${RootDir}/temp`;
  const createDirIfNotExists = (temp: string) =>
    !existsSync(temp) ? mkdirSync(temp) : undefined;
  createDirIfNotExists(temp);

  const destination = `${temp}/${fileName}`;
  https.get(url, (resp) => resp.pipe(fs.createWriteStream(destination)));

  return destination;
};

const getVideoUrl = async (contentId: number): Promise<any> => {
  const metadata = await getMetadata(contentId);

  if (!metadata || metadata.subtitles) {
    console.log(
      "Video doesn't exist or subtitles are already present for this video",
    );
    return null;
  }

  if (await isUrlAccessible(metadata?.[360])) {
    return metadata?.[360];
  } else if (await isUrlAccessible(metadata?.[720])) {
    return metadata?.[720];
  }

  return metadata?.[1080];
};

async function getSubtitles(destination: string) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(destination),
    model: 'whisper-1',
  });

  return transcription.text;
}

const uploadToBunny = async (filePath: string, fileName: string) => {
  const REGION = process.env.BUNNY_REGION;
  const BASE_HOSTNAME = 'storage.bunnycdn.com';
  const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
  const STORAGE_ZONE_NAME = process.env.STORAGE_ZONE_NAME;
  const ACCESS_KEY = process.env.BUNNY_STORAGE_API_KEY;

  const uploadFile = async () => {
    const readStream = fs.createReadStream(filePath);

    const options = {
      method: 'PUT',
      host: HOSTNAME,
      path: `/${STORAGE_ZONE_NAME}/newSubtitles/${fileName}`,
      headers: {
        AccessKey: ACCESS_KEY,
        'Content-Type': 'application/octet-stream',
      },
    };

    const req = https.request(options, (res) => {
      res.on('data', (chunk) => {
        console.log(chunk.toString('utf8'));
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    readStream.pipe(req);
  };

  const main = async () => {
    await uploadFile();
  };

  main();
};

export const createSubtitle = async (contentId: number) => {
  const url = await getVideoUrl(contentId);

  if (!url) {
    return;
  }

  const downloadedVideo = downloadVideo(url, `example.mp4`);

  await new Promise<void>((resolve, reject) => {
    ffmpeg(downloadedVideo)
      .output(`${RootDir}/temp/audio.mp3`)
      .on('end', () => {
        console.log('Conversion finished');
        resolve();
      })
      .on('error', (err) => reject(err))
      .run();
  });

  const subtitles = await getSubtitles(`${RootDir}/temp/audio.mp3`);

  const json = {
    subtitles,
  };

  fs.writeFileSync(
    `${RootDir}/temp/subtitles_${contentId}.json`,
    JSON.stringify(json),
  );

  await uploadToBunny(
    `${RootDir}/temp/subtitles_${contentId}.json`,
    `${contentId}.json`,
  );

  fs.rmSync(`${RootDir}/temp`, { recursive: true });
};
