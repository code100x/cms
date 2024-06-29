const AboutUsSection = () => {
  return (
    <div className="my-20 flex h-full w-full flex-col items-center justify-center">
      <h2 className="mb-8 text-2xl font-semibold text-slate-800 dark:text-slate-200 md:text-4xl">
        About 100xdevs
      </h2>

      <div className="mb-6 flex flex-col items-center justify-center px-4 md:mb-12 lg:px-48">
        <div className="mb-2 flex w-full flex-col items-start text-xl font-semibold text-neutral-700 dark:text-neutral-300 md:text-2xl">
          <h3>
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              100xdevs,
            </span>
          </h3>
        </div>

        <div className="mb-2 w-full text-lg text-neutral-600 dark:text-neutral-400 md:text-xl">
          <h3>
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
            . <br /> Join him in his{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-semibold text-transparent">
              live course
            </span>{' '}
            on Full Stack development with a heavy focus on{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-semibold text-transparent">
              Open source projects
            </span>{' '}
            to learn programming practically.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection;
