import Link from 'next/link';
import { Instagram, TwitterIcon, Youtube } from 'lucide-react';
import Image from 'next/image';
import playstore from '/public/platform/playstore.png';
import Logo from '../logo/logo';

const Footer = () => {
  return (
    <div className="bottom-0 mt-auto w-full p-4 bg-neutral-900 dark:bg-slate-900 px-6 lg:px-36">
      <div className="md:max-w-screen-2xl mt-4 mb-20 mx-auto flex flex-col lg:flex-row items-start justify-between w-full">
        <Logo onFooter={true} />

        <div className="flex flex-col justify-center my-8 lg:my-0">
          <h3 className="font-semibold text-neutral-100 mb-4">Quick Links</h3>
          <Link href={'/tnc'} className="hover:text-blue-500 text-neutral-200">
            Terms & Conditions
          </Link>
          <Link
            href={'/privacy-policy'}
            className="hover:text-blue-500 text-neutral-200"
          >
            Privacy Policy
          </Link>
          <Link
            href={'/refund'}
            className="hover:text-blue-500 text-neutral-200"
          >
            Refund & Cancellation
          </Link>
        </div>

        <div className="flex flex-col justify-center">
          <Link
            href={
              'https://play.google.com/store/apps/details?id=com.hundredx.devs'
            }
            target="_blank"
            className="hover:text-blue-500 font-semibold  text-neutral-200 mb-4"
          >
            Download App
            <Image
              className="shadow-md mt-2"
              src={playstore}
              alt={'playstore'}
              height={50}
              width={150}
            />
          </Link>
          <div>
            <h4 className="text-neutral-200 font-semibold mb-2">Follow us</h4>
            <div className="flex gap-x-2">
              <Link target="_blank" href={'https://twitter.com/kirat_tw'}>
                <TwitterIcon className="text-white hover:text-blue-500" />
              </Link>
              <Link
                target="_blank"
                href={'https://www.instagram.com/kirat_ins/'}
              >
                <Instagram className="text-white hover:text-blue-500" />
              </Link>
              <Link target="_blank" href={'https://www.youtube.com/@harkirat1'}>
                <Youtube className="text-white hover:text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
