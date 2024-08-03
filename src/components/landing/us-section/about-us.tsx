import Image from 'next/image';
import about from '@public/platform/about.jpg';
import { BorderBeam } from '@/components/magicui/border-beam';

const AboutUsSection = () => {
  return (
    <div className="wrapper my-20 grid w-full grid-cols-1 items-center justify-between gap-12 lg:grid-cols-2">
      <div className="relative h-fit w-fit rounded-2xl transition-all duration-300 hover:-translate-y-2">
        <Image
          src={about}
          alt={'about'}
          className="mx-auto h-full w-full rounded-2xl border-[0.2rem] border-foreground/10 object-cover shadow-xl lg:w-[50vw]"
        />
        <BorderBeam size={100} duration={12} delay={9} />
      </div>
      <div className="flex w-full flex-col items-start gap-8 px-4 md:px-12">
        <div>
          <h3 className="font-semibold text-foreground/60 md:text-lg">
            <span className="pr-1 text-lg font-bold text-blue-600">|</span>
            Trusted by Passionate Developers.
          </h3>
          <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              100xDevs.
            </span>
          </h2>
        </div>
        <p className="text-lg text-foreground/80">
          This is an initiative by{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-semibold text-transparent">
            Harkirat Singh
          </span>{' '}
          to personally mentor folks in the field of Programming. <br />{' '}
          Harkirat strongly feels that today you are either a 1x engineer or a
          100x engineer and nothing in the middle, and his hope is to take
          everyone in this community to be a{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-semibold text-transparent">
            100xEngineer
          </span>
          . <br />
          <br />
        </p>
      </div>
    </div>
  );
};

export default AboutUsSection;
