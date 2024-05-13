import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

export function AddNotionMetadata({
  onChange,
}: {
  onChange: (metadata: any) => void;
}) {
  const [id, setId] = useState('');

  useEffect(() => {
    onChange({ notionId: id });
  }, [id, onChange]);

  return (
    <div className="py-2">
      <Input
        className="dark:text-white text-black"
        type="text"
        placeholder="Notion id"
        onChange={async (e) => {
          setId(e.target.value);
        }}
      />
    </div>
  );
}
