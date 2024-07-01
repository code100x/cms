import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const getAvatarId = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const character = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  return character;
};
