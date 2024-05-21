import { Course } from '@/store/atoms';

export type OneCertificate = {
  certificateId: string;
  certificateSlug: string;
  completedAt: Date;
  course: Course;
};
