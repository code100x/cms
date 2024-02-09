import { CheckCircle2 } from 'lucide-react';
import PercentageComplete from './PercentageComplete';

export const ContentCard = ({
  image,
  title,
  onClick,
  markAsCompleted,
  percentComplete,
}: {
  contentId?: number;
  image: string;
  title: string;
  onClick: () => void;
  markAsCompleted?: boolean;
  percentComplete?: number | null;
}) => {
  return (
    <div
      onClick={onClick}
      className="relative hover:scale-105 ease-in duration-200"
    >
      {percentComplete !== null && percentComplete !== undefined && (
        <PercentageComplete percent={percentComplete} />
      )}
      {markAsCompleted && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 color="green" size={20} />
        </div>
      )}
      <img src={image} alt={title} className="rounded-md" />
      <div className="flex justify-between mt-2 text-gray-900 dark:text-white">
        <div>{title}</div>
      </div>
    </div>
  );
};
