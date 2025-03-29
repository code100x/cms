'use server';
import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export const validateFingerPrint = async (fingerprint: any) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) throw new Error("User is not logged in");

    if (!fingerprint) return { error: 'Fingerprint is not provided' };

    const user = await db.user.findFirst({
        where: {
          email: session.user.email,
        },
        select: {
            deviceFingerprint: true,
            token: true
          }
      });

    if (fingerprint !== user?.deviceFingerprint) {
        throw new Error('Invalid fingerprint - Session expired');
    }

    return { message: 'Fingerprint validated', fingerprint  };    
};