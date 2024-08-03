import { icons } from 'lucide-react';

interface IWhyUsCard {
  tagline: string;
  headline: string;
  description: string;
  icon: any;
}

const WhyUsCard = ({ tagline, headline, description, icon }: IWhyUsCard) => {
  return (
    <div className="flex min-h-[20rem] w-full flex-col items-start justify-between rounded-3xl bg-gradient-to-bl from-blue-600/5 to-neutral-50/10 px-8 py-12 transition-all duration-300 hover:-translate-y-2 md:px-12 md:py-8">
      <div className="flex flex-col gap-4">
        <div className="text-blue-600">
          <PostIcon iconName={icon} />
        </div>
        <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent lg:text-3xl">
          {tagline}
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-foreground md:text-xl">{headline}</h3>
        <p className="text-foreground/80">{description}</p>
      </div>
    </div>
  );
};

export default WhyUsCard;

interface PostIcon {
  iconName: string;
}

const PostIcon = ({ iconName }: PostIcon) => {
  //@ts-ignore
  const Icon = icons[iconName];
  return <Icon className="size-8" />;
};
