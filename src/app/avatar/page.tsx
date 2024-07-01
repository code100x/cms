import AvatarPage from '@/components/avatar/AvatarPage';
import { getAvatarId } from '@/db/avatar';

export default function Avatar() {
  return <AvatarPage />;
}

export async function avatarIdasd() {
  const avatarId = await getAvatarId();
  return avatarId;
}
