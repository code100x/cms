import { Input } from '@/components/ui/input';

export function AddNotionMetadata({
  register
}: {
  register?: any;
}) {
  return (
    <div className="py-2">
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="Notion id"
        {...register('notionId')}
      />
    </div>
  );
}
