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
// import Link from 'next/link';
// import { Button } from './ui/button';
// import { Download } from 'lucide-react';
import { useTheme } from 'next-themes';
import CodeBlock from './CodeBlock';
import { handleMarkAsCompleted } from '@/lib/utils';

// Week-4-1-647987d9b1894c54ba5c822978377910
export const NotionRenderer = ({
  id,
  courseId,
}: {
  id: string;
  courseId: number;
}) => {
  const { resolvedTheme } = useTheme();

  const [data, setData] = useState(null);
  async function main() {
    const res = await fetch(`/api/notion?id=${id}`);
    const json = await res.json();
    setData(json.recordMap);
  }

  useEffect(() => {
    main();

    return () => {
      handleMarkAsCompleted(true, courseId);
    };
  }, [id]);

  if (!data) {
    return <Loader />;
  }

  return (
    <div>
      {/* <Link href={`/pdf/${id}`} target="_blank">
        <Button size={'lg'} className="gap-2">
          Download
          <Download className="size-4" />
        </Button>
      </Link> */}
      <div>
        <style>
          {`
            :root {
              --bg-color: #F8F8F8;
              --fg-color: #333333;
            }
            .dark-mode {
              --bg-color: #1A1A1A;
              --fg-color: #E0E0E0;
            }
            .notion {
              background-color: var(--bg-color);
              color: var(--fg-color);
              max-width: 100%;
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-word;
              border-radius: 1rem;
            }
            .notion-page {
              padding: 1rem !important;
              width: 100% !important;
              max-width: 100% !important;
            }
            .notion-text {
              padding: 0.5rem 0;
              width: 100% !important;
              max-width: 100% !important;
            }
            .notion-h1,
            .notion-h2,
            .notion-h3 {
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
              width: 100% !important;
              max-width: 100% !important;
            }
            .notion-asset-wrapper {
              max-width: 100%;
            }
            .notion-asset-wrapper img {
              max-width: 100%;
              height: auto;
            }
            .notion-code {
              white-space: pre-wrap;
              word-break: break-all;
            }
            @media (max-width: 640px) {
              .notion-page {
                padding: 0.5rem !important;
              }
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
          disableHeader={true}
          className="notion-renderer"
        />
      </div>
    </div>
  );
};
