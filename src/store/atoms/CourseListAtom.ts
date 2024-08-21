import { atom } from 'recoil';

export const CourseList = atom({
  key: 'CourseList',
  default: true,
});

export const CourseSheet = atom({
  key: 'CourseSheet',
  default: false,
});
