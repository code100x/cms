import { z } from 'zod';

export const adminCourseCreationSchema = z.object({
  adminSecret: z.string().min(1, { message: 'Enter a valid admin secret' }),
  title: z.string().min(1, { message: 'Enter a valid course title' }),
  description: z
    .string()
    .min(1, { message: 'Enter a valid course description' }),
  imageUrl: z
    .string()
    .regex(
      /^http[^\\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim,
      'Enter a valid image url',
    ),
  id: z.string().min(1, { message: 'Enter a valid course id' }),
  slug: z.string().min(1, { message: 'Enter a valid course slug' }),
  appxCourseId: z.string().min(1, { message: 'Enter a valid appx course id' }),
  discordRoleId: z.string().min(1, { message: 'Enter a valid discord id' }),
});
