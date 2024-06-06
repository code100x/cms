const AboutUsSection = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-20">
      <h2 className="text-2xl md:text-4xl font-semibold text-slate-800 dark:text-slate-200 mb-8">
        About 100xdevs
      </h2>

      <div className="flex flex-col items-center justify-center px-4 lg:px-48 mb-6 md:mb-12">
        <div className="w-full flex flex-col items-start text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          <h3>
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              100xdevs,
            </span>
          </h3>
        </div>

        <div className="w-full text-lg md:text-xl text-neutral-600 dark:text-neutral-400 mb-2">
          <h3>
            This is an initiative by{' '}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Harkirat Singh
            </span>{' '}
            to personally mentor folks in the field of Programming. <br />{' '}
            Harkirat strongly feels that today you are either a 1x engineer or a
            100x engineer and nothing in the middle, and his hope is to take
            everyone in this community to be a{' '}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              100xEngineer
            </span>
            . <br /> Join him in his{' '}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              live course
            </span>{' '}
            on Full Stack development with a heavy focus on{' '}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
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
