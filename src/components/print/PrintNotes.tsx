'use client';

import { NotionRenderer as NotionRendererLib } from 'react-notion-x';
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
import { Print } from './Print';
import useMountStatus from '@/hooks/useMountStatus';

const PrintNotes = ({ recordMap }: { recordMap: any }) => {
  const mounted = useMountStatus();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <NotionRendererLib
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        className="z-10"
        components={{
          Code,
          Equation,
        }}
      />
      <Print />
    </>
  );
};

export default PrintNotes;
