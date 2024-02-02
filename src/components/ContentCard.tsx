export const ContentCard = ({
  image,
  title,
  onClick,
}: {
  image: string;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick}>
      <img src={image} alt={title} className="rounded-md" />
      <div className="flex justify-between mt-2 text-gray-900 dark:text-white">
        <div>{title}</div>
      </div>
    </div>
  );
};
