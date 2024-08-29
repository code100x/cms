'use client';
import { useEffect, useState } from 'react';
import { NotionRenderer as NotionRendererLib } from 'react-notion-x';
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
import dynamic from 'next/dynamic';

// const Code = dynamic(() =>
//   import('react-notion-x/build/third-party/code').then((m) => m.Code),
// );
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';

// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import { Loader } from './Loader';
import Link from 'next/link';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { useTheme } from 'next-themes';
import CodeBlock from './CodeBlock';

// Week-4-1-647987d9b1894c54ba5c822978377910
export const NotionRenderer = ({ id }: { id: string }) => {
  const { resolvedTheme } = useTheme();

  const [data, setData] = useState(null);
  async function main() {
    const res = await fetch(`/api/notion?id=${id}`);
    const json = await res.json();
    setData(json.recordMap);
  }

  useEffect(() => {
    main();
  }, [id]);

  if (!data) {
    return <Loader />;
  }

  return (
    <div>
      <Link href={`/pdf/${id}`} target="_blank">
        <Button size={'lg'} className="gap-2">
          Download
          <Download className="size-4" />
        </Button>
      </Link>
      <div>
        <style>
          {`
          :root {
            --notion-font-family: "Poppins", sans-serif; !important;
            --bg-color: #F5F5F5;
            --fg-color: #0a0a0a;
          }
          .dark-mode {
            --bg-color: #0A0A0A;
            --fg-color: #F5F5F5;
          }
          
        `}
        </style>
        <NotionRendererLib
          components={{
            Code: CodeBlock,
            Equation,
          }}
          recordMap={data}
          fullPage={true}
          darkMode={resolvedTheme === 'dark'}
        />
      </div>
    </div>
  );
};
