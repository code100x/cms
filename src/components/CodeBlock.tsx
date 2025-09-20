import React from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CodeBlockProps {
  block: {
    properties: {
      title: string[]; // Adjust this based on your actual block structure
    };
  };
}

const CodeBlock: React.FC<CodeBlockProps> = ({ block }) => {
  const code: string = block.properties.title[0].toString(); // Extract the code string

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success('Copied to clipboard');
    });
  };

  return (
    <div className="w-full overflow-auto py-2">
      <pre
        onClick={handleCopy}
        className="group relative flex cursor-pointer justify-between rounded-lg border border-primary/5 bg-neutral-50 p-6 dark:bg-neutral-900"
      >
        <code className="overflow-auto font-mono text-primary">{code}</code>
        <div className="absolute right-4 top-4 flex flex-col text-primary/50 transition-all duration-300 group-hover:opacity-100 lg:opacity-25">
          <Copy className="size-4 text-primary/50" />
        </div>
      </pre>
    </div>
  );
};

export default CodeBlock;
