import https from 'https';
import fs, { existsSync, mkdirSync } from 'fs';
import { RootDir } from '../../root-dir.mjs';
import {
  getMetadata,
  isUrlAccessible,
} from '@/components/admin/ContentRenderer';

export const downloadVideo = (url: string, fileName: string) => {
  const temp = `${RootDir}/temp`;
  const createDirIfNotExists = (temp: string) =>
    !existsSync(temp) ? mkdirSync(temp) : undefined;
  createDirIfNotExists(temp);

  const destination = `${temp}/${fileName}`;
  https.get(url, (resp) => resp.pipe(fs.createWriteStream(destination)));
};

export const getVideoUrl = async (contentId: number): Promise<string> => {
  const metadata = await getMetadata(contentId);

  if (await isUrlAccessible(metadata?.[360])) {
    return metadata?.[360];
  } else if (await isUrlAccessible(metadata?.[720])) {
    return metadata?.[720];
  }

  return metadata?.[1080];
};

// export const convertVideoToMP3 = async (contentId: number) => {
//   const url = await getVideoUrl(contentId);
//   //TODO: check format of video here
//   const downloadVideo = (url, 'example.');
// };
