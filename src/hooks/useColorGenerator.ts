'use client';
import { useCallback, useEffect, useState } from 'react';

type ColorPair = {
  background: string;
  text: string;
};

const colorPairs: ColorPair[] = [
  { background: 'bg-blue-background', text: 'text-blue' },
  { background: 'bg-green-background', text: 'text-green' },
  { background: 'bg-purple-background', text: 'text-purple' },
  { background: 'bg-orange-background', text: 'text-orange' },
];

const useColorGenerator = (name: string = 'M1000'): ColorPair => {
  const [colors, setColors] = useState<ColorPair>(colorPairs[0]);

  const generateColorPair = useCallback((str: string): ColorPair => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colorPairs.length;
    return colorPairs[index];
  }, []);

  const updateColor = useCallback(() => {
    const colorPair = generateColorPair(name);
    setColors(colorPair);
  }, [name, generateColorPair]);

  useEffect(() => {
    updateColor();
  }, [updateColor]);

  return colors;
};

export default useColorGenerator;
