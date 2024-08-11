import http from 'http';
import https from 'https';
import fs from 'fs';
import { URL } from 'url';

export const downloadVideo = (fileUrl: string, destination: string) => {
  const url = new URL(fileUrl);
  const protocol = url.protocol === 'https:' ? https : http;

  const file = fs.createWriteStream(destination);

  protocol
    .get(fileUrl, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Failed to download file. Status code: ${response.statusCode}`,
        );
        response.resume();
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close(() => {
          console.log('File downloaded successfully');
        });
      });

      file.on('error', (err) => {
        fs.unlink(destination, () => {
          console.error('Error writing file:', err);
        });
      });
    })
    .on('error', (err) => {
      fs.unlink(destination, () => {
        console.error('Error downloading file:', err);
      });
    });
};
