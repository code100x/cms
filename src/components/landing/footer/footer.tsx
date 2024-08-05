import Link from 'next/link';
import { SiInstagram, SiYoutube, SiX } from '@icons-pack/react-simple-icons';
import Image from 'next/image';
import playstore from '/public/platform/playstore.png';
import Logo from '../logo/logo';

const Footer = () => {
  return (
    <div className="bottom-0 w-full bg-neutral-100 p-16 shadow-xl dark:bg-slate-900">
      <div className="mx-auto mt-4 flex w-full flex-col items-start justify-between gap-12 md:max-w-7xl md:flex-row">
        <div className="flex flex-col gap-2 text-foreground">
          <Logo onFooter={true} />
          because 10x ain't enough!
        </div>
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="flex flex-col">
            <h3 className="mb-4 font-semibold text-foreground">Quick Links</h3>
            <Link
              href={'/tnc'}
              className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
            >
              Terms & Conditions
            </Link>
            <Link
              href={'/privacy-policy'}
              className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
            >
              Privacy Policy
            </Link>
            <Link
              href={'/refund'}
              className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
            >
              Refund & Cancellation
            </Link>
          </div>

          <div className="flex flex-col gap-12">
            <Link
              href={
                'https://play.google.com/store/apps/details?id=com.hundredx.devs'
              }
              target="_blank"
              className="font-semibold text-foreground transition-all duration-300 hover:text-blue-500"
            >
              Download Our App
              <Image
                className="mt-2 shadow-md"
                src={playstore}
                alt={'playstore'}
                height={50}
                width={150}
              />
            </Link>
            <div>
              <h4 className="mb-2 font-semibold text-foreground">Follow us</h4>
              <div className="flex gap-x-2">
                <Link target="_blank" href={'https://twitter.com/kirat_tw'}>
                  <SiX className="text-foreground/60 transition-all duration-300 hover:text-blue-600" />
                </Link>
                <Link
                  target="_blank"
                  href={'https://www.instagram.com/kirat_ins/'}
                >
                  <SiInstagram className="text-foreground/60 transition-all duration-300 hover:text-blue-600" />
                </Link>
                <Link
                  target="_blank"
                  href={'https://www.youtube.com/@harkirat1'}
                >
                  <SiYoutube className="text-foreground/60 transition-all duration-300 hover:text-blue-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
