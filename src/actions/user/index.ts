'use server';
import db from '@/db';
import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export const logoutUser = async (email: string, adminPassword: string) => {
  if (adminPassword !== process.env.ADMIN_SECRET) {
    return { error: 'Unauthorized' };
  }

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return { message: 'User not found' };
  }
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      token: '',
    },
  });

  return { message: 'User logged out' };
};

type GetAppxAuthTokenResponse = {
  name: string | null;
  email: string | null;
  appxAuthToken: string | null;
  appxUserId: string | null;
}

export const GetAppxAuthToken = async (): Promise<GetAppxAuthTokenResponse> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) throw new Error("User is not logged in");

  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
    select: {
      name: true,
      email: true,
      appxAuthToken: true,
      appxUserId: true
    }
  });

  if (!user || !user.appxAuthToken) throw new Error("User not found");
  return user;
};

export const GetAppxVideoPlayerUrl = async (courseId: string, videoId: string): Promise<string> => {
  const { name, email, appxAuthToken, appxUserId } = await GetAppxAuthToken();
  const url = `${process.env.APPX_BASE_API}/get/fetchVideoDetailsById?course_id=${courseId}&video_id=${videoId}&ytflag=${1}&folder_wise_course=${1}`;

  const config = {
    url,
    method: 'get',
    maxBodyLength: Infinity,
    headers: {
      Authorization: appxAuthToken,
      'Auth-Key': process.env.APPX_AUTH_KEY,
      'User-Id': appxUserId,
    },
  };

  const res = await axios.request(config);
  const { video_player_token, video_player_url } = res.data.data;
  const full_video_url = `${video_player_url}${video_player_token}&watermark=${name}%0A${email}`;
  return full_video_url;
};
