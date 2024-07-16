import { readFileSync } from 'fs';

export interface DurationMetaData {
  id: number;
  duration: number;
  date: string;
}

const getVideoTimeAndData = () => {
  const data = readFileSync(
    './updateVideoDateAndTimeData/cohort2.json',
    'utf-8',
  );
  const json = JSON.parse(data);
  return json.videos as DurationMetaData[];
};

export const durationMetaData: DurationMetaData[] = getVideoTimeAndData();
