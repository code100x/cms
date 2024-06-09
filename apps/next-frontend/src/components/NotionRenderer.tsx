'use client';
import { useEffect, useState } from 'react';
import { NotionRenderer as NotionRendererLib } from 'react-notion-x';
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
import dynamic from 'next/dynamic';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code),
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
);

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';

// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import { Loader } from './Loader';
import Link from 'next/link';
import { Button } from '@repo/ui/shad/button';
import { DownloadIcon } from 'lucide-react';

// Week-4-1-647987d9b1894c54ba5c822978377910
export const NotionRenderer = ({ id }: { id: string }) => {
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
    <div className="relative">
      <Link
        href={`/pdf/${id}`}
        target="_blank"
        className="absolute right-4 top-4 z-20"
      >
        <Button
          variant="outline"
          className="bg-white text-black dark:bg-[#020917] dark:text-white"
        >
          Download
          <div className="pl-2">
            <DownloadIcon />
          </div>
        </Button>
      </Link>
      <div style={{}}>
        <NotionRendererLib
          recordMap={data}
          fullPage={true}
          darkMode={true}
          className="z-10"
          components={{
            Code,
            Equation,
          }}
        />
      </div>
    </div>
  );
};
