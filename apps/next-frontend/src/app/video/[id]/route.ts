import { authOptions } from '@repo/common/lib/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

const VIDEO_FETCH_URL = process.env.FETCHER_URL;

// Input is /video/123.m3u8
export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    // Remove .m3u8 extension if present
    const videoId = id.replace('.m3u8', '');

    const session = await getServerSession(authOptions);
    if (!session || !session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await axios.get(
      `${VIDEO_FETCH_URL}/video/get?videoId=${videoId}&id=${session.user.id}`,
      {
        responseType: 'text',
      },
    );

    // Set the correct content type for m3u8 files
    const headers = new Headers();
    headers.set('Content-Type', 'application/vnd.apple.mpegurl');

    // Return the m3u8 content directly
    return new NextResponse(response.data, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching m3u8:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
