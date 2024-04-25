// File: /pages/api/certificate/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import db from '@/db';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  // The ID is part of the URL, so we extract it from the query
  const { id } = req.query;

  try {
    //  ID is a string and parse it to an integer to get the certificate ID right ?
    const certificateId = parseInt(id as string, 10);

    const certificate = await db.certificate.findUnique({
      where: {
        id: certificateId,
      },
      include: {
        course: true, //  include course details here
      },
    });

    if (!certificate) {
      res.status(404).json({ error: 'Certificate not found' });
      return;
    }

    const imagePath = path.join(
      process.cwd(),
      'public',
      'certificates',
      `${certificate.certificateUrl}`,
    );
    const imageBuffer = await fs.promises.readFile(imagePath);

    res.setHeader('Content-Type', 'certificates/png');
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${certificate.course.title} Certificate.png"`,
    ); // Update extension accordingly
    res.send(imageBuffer);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ error: 'Error fetching certificate' });
  }
}
