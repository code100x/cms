import { getOauthUrl } from '@/utiles/discord';
import Link from 'next/link';
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export const JoinDiscord = () => {
  return (
    <Link href={getOauthUrl()} target="_blank" legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        Join Discord
      </NavigationMenuLink>
    </Link>
  );
};
