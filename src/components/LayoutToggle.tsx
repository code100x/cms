'use client';
import React, { useEffect } from 'react';
import { Grid3X3, Rows3 } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { layoutToggle } from '@/store/atoms/layout';

const LayoutToggle = () => {
  const [layoutType, setLayoutType] = useRecoilState(layoutToggle);

  useEffect(() => {
    const storedLayout = localStorage.getItem('layout');
    if (storedLayout !== null) {
      setLayoutType(parseInt(storedLayout, 10));
    }
  }, []);

  const handleLayoutChange = (type: number) => {
    setLayoutType(type);
    localStorage.setItem('layout', type.toString());
  };

  return (
    <>
      <div className="flex border w-[6rem] h-[2rem] justify-center rounded-full items-center">
        <div
          onClick={() => handleLayoutChange(1)}
          className={`${layoutType === 1 ? 'bg-blue-500 rounded-sm text-black' : ''} w-[50%] flex cursor-pointer items-center justify-center h-full rounded-l-full`}
        >
          <Grid3X3 size={18} className={` `} />
        </div>
        <div
          onClick={() => handleLayoutChange(2)}
          className={`${layoutType === 2 ? 'bg-blue-500 rounded-sm text-black' : ''} w-[50%] flex cursor-pointer items-center justify-center h-full rounded-r-full`}
        >
          <Rows3 size={18} className={``} />
        </div>
      </div>
    </>
  );
};

export default LayoutToggle;
