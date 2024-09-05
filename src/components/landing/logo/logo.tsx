import Link from 'next/link';

const Logo = ({ text = false }: { text?: boolean }) => {
  return (
    <Link href={'/'} className="flex w-full items-center gap-2">
      <img
        src={
          'https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg'
        }
        className="size-10 rounded-full"
      />
      {text && (
        <p
          className={`w-full bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-xl font-black tracking-tighter text-transparent md:text-2xl`}
        >
          100xDevs
        </p>
      )}
    </Link>
  );
};

export default Logo;
