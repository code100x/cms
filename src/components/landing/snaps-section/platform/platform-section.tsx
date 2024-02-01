import Image from 'next/image';
import platform from '../../../../../public/platform/platform.png';

const PlatformSection = () => {
  return (
    <div className="w-full flex items-center justify-center my-20">
      <div className="mx-2 p-3 md:p-6 bg-gradient-to-t from-slate-300 dark:from-slate-700 to-slate-400 dark:to-slate-600 rounded-xl md:rounded-2xl border shadow-xl">
        <Image
          src={platform}
          alt={'platform'}
          width={1080}
          height={1920}
          className="rounded-lg md:rounded-xl border-2 border-slate-600"
        />
      </div>
    </div>
  );
};

export default PlatformSection;
