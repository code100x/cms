import Link from 'next/link';
import Logo from '../logo/logo';
import { Button } from '../../ui/button';
import { Sparkles } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-16 border-b shadow-sm bg-white/80 backdrop-blur-md flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
        <Logo />

        <div className="flex items-center justify-between md:w-auto md:block space-x-2 md:space-x-4">
          <Button variant={'outline'} size={'sm'} asChild>
            <Link href={'https://app.100xdevs.com/api/auth/signin'}>Login</Link>
          </Button>
          <Button size={'sm'} asChild>
            <Link
              href={'https://harkirat.classx.co.in/new-courses'}
              target="_blank"
            >
              Join now <Sparkles className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
