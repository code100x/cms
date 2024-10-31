'use client';

import useMountStatus from '@/hooks/useMountStatus';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { NotionRenderer as NotionRendererLib } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import { Print } from './Print';

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

const PrintNotes = ({ recordMap }: { recordMap: any }) => {
  const mounted = useMountStatus();

  const customComponents = useMemo(() => ({ Code, Equation }), []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        .notion-code {
          font-size: 85% !important;
          padding: 1rem !important;
          background-color: #f6f8fa !important;
          border: 1px solid #e1e4e8 !important;
          border-radius: 6px !important;
          margin: 1.5em 0 !important;
        }
        .notion-code-copy-button {
          display: none !important;
        }
        @media print {
          .notion-code {
            break-inside: avoid;
          }
        }
      `}</style>
      <NotionRendererLib
        recordMap={recordMap}
        fullPage={true}
        darkMode={false}
        className="z-10"
        disableHeader={true}
        components={customComponents}
      />
      <Print />
    </>
  );
};

export default PrintNotes;
