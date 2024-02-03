import { getOauthUrl } from '@/utiles/discord';
import Link from 'next/link';
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';

export const JoinDiscord = ({
  isNavigated = true,
  isInMenu = false,
}: {
  isNavigated?: boolean
  isInMenu?: boolean
}) => {
  if (isNavigated) {
    return (
      <Link href={getOauthUrl()} target="_blank" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Join Discord
        </NavigationMenuLink>
      </Link>
    );
  }

  return (
    <Link href={getOauthUrl()} target="_blank" legacyBehavior passHref>
      <Button variant={isInMenu ? 'navLink' : 'link'} size={'sm'}>
        Join Discord
      </Button>
    </Link>
  );
};
