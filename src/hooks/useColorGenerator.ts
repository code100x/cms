'use client';
import { useCallback, useEffect, useState } from 'react';

const useColorGenerator = (name: string = 'M1000'): [string, string] => {
  const [colors, setColors] = useState<[string, string]>(['', '']);

  const stringToHexColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = (hash & 0x00ffffff).toString(16);
    return `#${'00000'.substring(0, 6 - color.length) + color}`;
  };

  const isColorDark = (color: string): boolean => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 2), 16);
    const b = parseInt(hex.substring(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  const updateColor = useCallback(() => {
    const hexColor = stringToHexColor(name);
    const isDark = isColorDark(hexColor);
    const textColor =
      // eslint-disable-next-line no-nested-ternary
      name.split(' ').length === 1 ? '#ffffff' : isDark ? '#ffffff' : '#000000';
    setColors([hexColor, textColor]);
  }, [name]);

  useEffect(() => {
    updateColor();
  }, [updateColor]);

  return colors;
};

export default useColorGenerator;
