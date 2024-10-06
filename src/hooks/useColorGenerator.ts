'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

// Light mode and dark mode color palettes
const tagColors = {
  light: [
    { bg: '#F3F4F6', text: '#1F2937' }, // Gray
    { bg: '#FEE2E2', text: '#991B1B' }, // Red
    { bg: '#FEF3C7', text: '#92400E' }, // Yellow
    { bg: '#D1FAE5', text: '#065F46' }, // Green
    { bg: '#DBEAFE', text: '#1E40AF' }, // Blue
    { bg: '#E0E7FF', text: '#3730A3' }, // Indigo
    { bg: '#EDE9FE', text: '#5B21B6' }, // Purple
    { bg: '#FCE7F3', text: '#9D174D' }, // Pink
  ],
  dark: [
    { bg: '#1F2937', text: '#F3F4F6' }, // Gray
    { bg: '#991B1B', text: '#FEE2E2' }, // Red
    { bg: '#92400E', text: '#FEF3C7' }, // Yellow
    { bg: '#065F46', text: '#D1FAE5' }, // Green
    { bg: '#1E40AF', text: '#DBEAFE' }, // Blue
    { bg: '#3730A3', text: '#E0E7FF' }, // Indigo
    { bg: '#5B21B6', text: '#EDE9FE' }, // Purple
    { bg: '#9D174D', text: '#FCE7F3' }, // Pink
  ],
};

const getContrast = (hexColor: string): number => {
  const rgb = parseInt(hexColor.slice(1), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance;
};

const useColorGenerator = (
  name: string = 'M1000',
  isDarkMode: boolean = false,
): [string, string] => {
  const [colors, setColors] = useState<[string, string]>(['', '']);

  const colorPalette = useMemo(
    () => (isDarkMode ? tagColors.dark : tagColors.light),
    [isDarkMode],
  );

  const generateColorIndex = useCallback(
    (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash) % colorPalette.length;
    },
    [colorPalette],
  );

  const updateColor = useCallback(() => {
    const colorIndex = generateColorIndex(name);
    const { bg, text } = colorPalette[colorIndex];

    const bgContrast = getContrast(bg);
    const textContrast = getContrast(text);

    let adjustedTextColor = text;

    if (Math.abs(bgContrast - textContrast) < 0.5) {
      if (bgContrast > 0.5) {
        adjustedTextColor = '#000000';
      } else {
        adjustedTextColor = '#FFFFFF';
      }
    }

    setColors([bg, adjustedTextColor]);
  }, [name, colorPalette, generateColorIndex]);

  useEffect(() => {
    updateColor();
  }, [updateColor]);

  return colors;
};

export default useColorGenerator;
