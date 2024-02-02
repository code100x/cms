import { useEffect, useState } from 'react';

export function AddNotionMetadata({
  onChange,
}: {
  onChange: (metadata: any) => void
}) {
  const [id, setId] = useState('');

  useEffect(() => {
    onChange({ notionId: id });
  }, [id]);

  return (
    <div>
      <input
        className="text-black"
        type="text"
        placeholder="Notion id"
        onChange={async (e) => {
          setId(e.target.value);
        }}
      />
    </div>
  );
}
