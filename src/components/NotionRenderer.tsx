'use client';
import { useEffect, useState } from 'react';
import { NotionRenderer as NotionRendererLib } from 'react-notion-x';
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';

// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import { Loader } from './Loader';

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
    <div>
      <div style={{}}>
        <NotionRendererLib recordMap={data} fullPage={true} darkMode={true} className='z-10'/>
      </div>
    </div>
  );
};
