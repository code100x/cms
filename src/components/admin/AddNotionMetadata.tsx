import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

export function AddNotionMetadata({
  onChange,
}: {
  onChange: (metadata: any) => void;
}) {
  const [id, setId] = useState('');

  useEffect(() => {
    onChange({ notionId: id });
  }, [id]);

  return (
    <div className="py-2">
      <Input
        className="text-black dark:text-white"
        type="text"
        placeholder="Notion id"
        onChange={async (e) => {
          setId(e.target.value);
        }}
      />
    </div>
  );
}
