import https from 'https';
import fs, { existsSync, mkdirSync, writeFileSync } from 'fs';
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

  await new Promise<void>((resolve, reject) => {
    const createDirIfNotExists = (temp: string) =>
      !existsSync(temp) ? mkdirSync(temp) : undefined;
    createDirIfNotExists(`${RootDir}/temp`);

    ffmpeg()
      .input(url)
      .outputOptions('-ab', '192k')
      .saveToFile('temp/audio.mp3')
      .on('progress', (progress) => {
        if (progress.percent) {
          console.log(`Processing: ${Math.floor(progress.percent)}% done`);
        }
      })
      .on('end', () => {
        console.log('FFmpeg has finished.');
        resolve();
      })
      .on('error', (error) => {
        console.error(error);
        reject();
      });
  });

  const subtitles = await getSubtitles(`${RootDir}/temp/audio.mp3`);

  writeFileSync(`${RootDir}/temp/subtitles_${contentId}.srt`, subtitles);

  await uploadToBunny(
    `${RootDir}/temp/subtitles_${contentId}.srt`,
    `${contentId}.srt`,
  );

  fs.rmSync(`${RootDir}/temp`, { recursive: true });
};
