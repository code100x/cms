import https from 'https';
import fs, { existsSync, mkdirSync } from 'fs';
import { RootDir } from '../../root-dir.mjs';

export const downloadVideo = (url: string, fileName: string) => {
  const temp = `${RootDir}/temp`;
  const createDirIfNotExists = (temp: string) =>
    !existsSync(temp) ? mkdirSync(temp) : undefined;
  createDirIfNotExists(temp);

  const destination = `${temp}/${fileName}`;
  https.get(url, (resp) => resp.pipe(fs.createWriteStream(destination)));
};
