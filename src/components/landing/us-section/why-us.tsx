import WhyUsCard from './why-us-card/why-us-card';
import { whyUs } from './why-us-card/why-us-content';

const WhyUsSection = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12">
      <div className="flex max-w-3xl flex-col items-center justify-center gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h3 className="font-semibold text-foreground/60 md:text-lg">
            Learn, Build, Ship without FOMO.
          </h3>
          <h2 className="text-3xl font-bold tracking-tighter text-foreground md:text-6xl">
            Why{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              100xDevs?
            </span>
          </h2>
        </div>

        <h3 className="mb-2 w-full text-lg text-foreground/80 md:text-xl">
          No compromises. With 100xdevs, you don&apos;t have to choose between
          different tutors and random tutorials. Get the power of building
          production-ready applications.
        </h3>
      </div>
      <div className=":grid-cols-2 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:px-16">
        {whyUs.map((item) => {
          return (
            <WhyUsCard
              key={item.id}
              tagline={item.tagline}
              headline={item.headline}
              description={item.description}
              icon={item.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WhyUsSection;
