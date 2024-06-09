import WhyUsCard from './why-us-card/why-us-card';
import { whyUs } from './why-us-card/why-us-content';

const WhyUsSection = () => {
  return (
    <div className="my-12 flex h-full w-full flex-col items-center justify-center bg-slate-200 py-12">
      <h2 className="mb-8 text-2xl font-semibold text-slate-800 md:text-4xl">
        Why 100xdevs?
      </h2>

      <div className="mb-6 flex flex-col items-center justify-center px-4 md:mb-12 md:flex-row lg:px-48">
        <div className="mb-2 flex w-full flex-col items-start text-xl font-semibold text-neutral-700 md:text-2xl">
          <h3>Learn, build, and ship —</h3>
          <h3>without the fear of missing out.</h3>
        </div>

        <div className="mb-2 w-full text-lg text-neutral-600 md:text-xl">
          <h3>
            No compromises. With 100xdevs, you don&apos;t have to choose between
            different tutors and random tutorials. Get the power of building
            production-ready applications.
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 lg:px-16 xl:grid-cols-3 2xl:grid-cols-4">
        {whyUs.map((item) => {
          return (
            <WhyUsCard
              key={item.id}
              tagline={item.tagline}
              headline={item.headline}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WhyUsSection;
