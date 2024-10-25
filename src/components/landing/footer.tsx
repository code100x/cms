import Link from 'next/link';
import { Separator } from '../ui/separator';
import {
  GitHubLogo,
  InstaLogo,
  XLogo,
  YtLogo,
} from '../../../public/footer-logos/all-logos';

const Footer = () => {
  return (
    <>
      <Separator className="mx-auto my-2" />
      <div className="wrapper bottom-0 mx-auto mb-16 flex w-full flex-col items-center gap-2">
        <div className="mx-auto flex w-full flex-col justify-between gap-12 p-4 md:flex-row">
          <div className="flex flex-col gap-12 text-primary">
            <Link href={'/'} className="flex cursor-pointer items-center gap-2">
              <img
                src={
                  'https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg'
                }
                alt="Logo"
                width={300}
                height={200}
                className="size-16 rounded-full"
              />
              <div className="flex flex-col">
                <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 text-4xl font-extrabold tracking-tighter text-transparent">
                  100xDevs
                </span>
                <p className="text-lg leading-none tracking-tight text-primary">
                  because 10x ain't enough.
                </p>
              </div>
            </Link>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold tracking-tight text-foreground">
                Follow us
              </h4>
              <div className="flex gap-4">

                {/* X Button */}
                <Link
                  target="_blank"
                  href={'https://x.com/kirat_tw'}
                  className="rounded-lg bg-blue-500/10 p-2 text-primary"
                >
<<<<<<< HEAD
                  <svg
                    viewBox="-0.5 -0.5 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6 transition-all duration-300 hover:text-blue-600"
                  >
                    <path
                      d="M11.133375000000001 14.11 1.2831875000000001 1.445375c-0.23112500000000002 -0.2970625 -0.019375 -0.73 0.35700000000000004 -0.73h1.869375c0.1395625 0 0.2713125 0.0644375 0.35700000000000004 0.17462499999999997l9.85025 12.6645625c0.23112500000000002 0.2971875 0.019375 0.7300625 -0.35700000000000004 0.7300625h-1.8693125c-0.139625 0 -0.271375 -0.0644375 -0.357125 -0.17462499999999997Z"
                      stroke="currentColor"
                      strokeWidth="1"
                    ></path>
                    <path
                      d="M13.530750000000001 0.7153750000000001 1.46925 14.284625"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1"
                    ></path>
                  </svg>
=======
                  <XLogo />
>>>>>>> origin/main
                </Link>

                {/* Instagram Button */}
                <Link
                  target="_blank"
                  href={'https://www.instagram.com/kirat_ins/'}
                  className="rounded-lg bg-blue-500/10 p-2 text-primary"
                >
                  <InstaLogo />
                </Link>

                {/* YT Button */}
                <Link
                  target="_blank"
                  href={'https://www.youtube.com/@harkirat1'}
                  className="rounded-lg bg-blue-500/10 p-2 text-primary"
                >
                  <YtLogo />
                </Link>

                {/* Github Button */}
                <Link
                  target="_blank"
                  href={'https://github.com/code100x'}
                  className="rounded-lg bg-blue-500/10 p-2 text-primary"
                >
                  <GitHubLogo />
                </Link>
                
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg tracking-tighter text-primary">
              100x Links
            </h4>
            <div className="flex flex-col gap-1 text-lg tracking-tighter">
              <Link
                href={'https://projects.100xdevs.com'}
                target="_blank"
                className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
              >
                Projects
              </Link>

              <Link
                href={'https://report-100xdevs.vercel.app/'}
                target="_blank"
                className="text-foreground/75 transition-all duration-300 hover:text-blue-600"
              >
                Report
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-lg tracking-tighter text-primary">
              100x Legal
            </h4>
            <div className="flex flex-col gap-1 text-lg tracking-tighter">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
