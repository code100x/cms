import { getOauthUrl } from '@/utiles/discord';
import Link from 'next/link';
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export const JoinDiscord = ({
  isNavigated = true,
}: {
  isNavigated?: boolean;
  isInMenu?: boolean;
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
    <Link
      className="text-white"
      href={getOauthUrl()}
      target="_blank"
      legacyBehavior
      passHref
    >
      <div>Discord</div>
    </Link>
  );
};
