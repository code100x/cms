interface IWhyUsCard {
  tagline: string;
  headline: string;
  description: string;
}

const WhyUsCard = ({ tagline, headline, description }: IWhyUsCard) => {
  return (
    <div className="mb-6">
      <div className="flex w-full flex-col items-start justify-center px-4 md:px-12">
        <h3 className="text-sm font-medium text-neutral-500">
          <span className="pr-1 text-lg font-bold text-blue-600">|</span>
          {tagline}
        </h3>

        <h2 className="mb-2.5 mt-1.5 text-xl font-semibold text-neutral-800 md:mb-4 md:mt-1 md:text-2xl">
          {headline}
        </h2>

        <p className="text-md font-medium text-neutral-600">{description}</p>
      </div>
    </div>
  );
};

export default WhyUsCard;
