import { ROLES } from '@/actions/types';
import { User } from '@prisma/client';
import { atom } from 'recoil';

interface UserType extends User {
  role: ROLES;
}

export const auth = atom<UserType | null>({
  key: 'auth-atom',
  default: null,
});
